import { Kanji } from '@/@types/globals';
import { KanjiSchema } from '@/schemas/globals';
import taggedTemplate from '@/utilities/taggedTemplate';
import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';
import { Validator } from 'jsonschema';
import { NextRequest, NextResponse } from 'next/server';

const validator = new Validator();

export const POST = async (request: NextRequest) => {
  try {
    const requestBody: Kanji = await request.json();
    if (typeof requestBody !== 'object' || !validator.validate(requestBody, KanjiSchema).valid)
      return NextResponse.json({ error: 'Request body is invalid' }, { status: 400 });

    await sql`
      INSERT INTO public."Kanji" ("Character", "Onyomi", "Kunyomi", "Meaning", "Popularity")
      VALUES (${requestBody.Character}, ${requestBody.Onyomi as any}, ${requestBody.Kunyomi as any}, ${requestBody.Meaning as any}, ${requestBody.Popularity as any})
    `;

    const radicalIds = requestBody.RadicalIds;
    if (radicalIds?.length) {
      const query = taggedTemplate`
        INSERT INTO public."RadicalsInKanji" ("KanjiId", "RadicalId") VALUES
      `;
      radicalIds.forEach((radicalId, index) => {
        query.append`(CURRVAL('"Kanji_KanjiId_seq"'::REGCLASS), ${radicalId})`;
        if (index !== radicalIds.length - 1) query.append`,`;
      });
      await sql(...query.array);
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const search = request.nextUrl.searchParams.get('s');
    let dbResponse: QueryResult<QueryResultRow>;

    if (search !== null) {
      dbResponse = await sql`
        SELECT DISTINCT public."Kanji".* FROM public."Kanji"
        LEFT OUTER JOIN public."RadicalsInKanji" ON public."RadicalsInKanji"."KanjiId" = public."Kanji"."KanjiId"
        LEFT OUTER JOIN public."Radicals" ON public."RadicalsInKanji"."RadicalId" = public."Radicals"."RadicalId"
        WHERE public."Kanji"."Meaning" LIKE '%' || LOWER(${search}) || '%'
        OR public."Kanji"."Character" = ${search}
        OR ${search} = any("Kanji"."Onyomi")
        OR ${search} = any("Kanji"."Kunyomi")
        OR public."Kanji"."KanjiId"::VARCHAR = ${search}
        OR public."Radicals"."Character" = ${search}
        OR ${search} = any("Radicals"."OtherVariants")
        ORDER BY public."Kanji"."Popularity" ASC
      `;
    } else {
      const character = request.nextUrl.searchParams.get('c');
      const onyomi = request.nextUrl.searchParams.get('o');
      const kunyomi = request.nextUrl.searchParams.get('k');
      const meaning = request.nextUrl.searchParams.get('m');
      const radical = request.nextUrl.searchParams.get('r');

      if (
        character === null &&
        onyomi === null &&
        kunyomi === null &&
        meaning === null &&
        radical === null
      )
        throw new Error('no attributes provided');

      const query = taggedTemplate`
        SELECT DISTINCT public."Kanji".* FROM public."Kanji"
      `;
      if (radical !== null)
        query.append`
          LEFT OUTER JOIN public."RadicalsInKanji" ON public."RadicalsInKanji"."KanjiId" = public."Kanji"."KanjiId"
          LEFT OUTER JOIN public."Radicals" ON public."RadicalsInKanji"."RadicalId" = public."Radicals"."RadicalId"
        `;
      query.append`
        WHERE
      `;

      let encounteredFirstStatement = false;
      const prependAnd = () => {
        if (encounteredFirstStatement) query.append`AND`;
        encounteredFirstStatement = true;
      };

      if (meaning !== null) {
        prependAnd();
        query.append`
          public."Kanji"."Meaning" LIKE '%' || LOWER(${meaning}) || '%'
        `;
      }
      if (character !== null) {
        prependAnd();
        query.append`
          public."Kanji"."Character" = ${character}
        `;
      }
      if (onyomi !== null) {
        prependAnd();
        query.append`
          ${onyomi} = any("Kanji"."Onyomi")
        `;
      }
      if (kunyomi !== null) {
        prependAnd();
        query.append`
          ${kunyomi} = any("Kanji"."Kunyomi")
        `;
      }
      if (radical !== null) {
        prependAnd();
        query.append`(
          public."Radicals"."Character" = ${radical}
          OR ${radical} = any("Radicals"."OtherVariants")
        )`;
      }
      query.append`ORDER BY public."Kanji"."Popularity" ASC`;

      dbResponse = await sql(...query.array);
    }

    return NextResponse.json(dbResponse.rows, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};
