import { Word } from '@/@types/globals';
import { WordSchema } from '@/schemas/globals';
import taggedTemplate from '@/utilities/taggedTemplate';
import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';
import { Validator } from 'jsonschema';
import { NextRequest, NextResponse } from 'next/server';

const validator = new Validator();

export const POST = async (request: NextRequest) => {
  try {
    const requestBody: Word = await request.json();
    if (typeof requestBody !== 'object' || !validator.validate(requestBody, WordSchema).valid)
      return NextResponse.json({ error: 'Request body is invalid' }, { status: 400 });

    await sql`
      INSERT INTO public."Words" ("Word", "Reading", "PitchAccents", "Meanings", "Popularity", "OtherVariants")
      VALUES (${requestBody.Word}, ${requestBody.Reading}, ${requestBody.PitchAccents as any}, ${requestBody.Meanings as any}, ${requestBody.Popularity as any}, ${requestBody.OtherVariants as any})
    `;

    const kanjiIds = requestBody.KanjiIds;
    if (kanjiIds?.length) {
      const query = taggedTemplate`
        INSERT INTO public."KanjiInWords" ("WordId", "KanjiId") VALUES
      `;
      kanjiIds.forEach((kanjiId, index) => {
        query.append`(CURRVAL('"Words_WordId_seq"'::REGCLASS), ${kanjiId})`;
        if (index !== kanjiIds.length - 1) query.append`,`;
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
      SELECT DISTINCT public."Words".* FROM public."Words"
      LEFT OUTER JOIN public."KanjiInWords" ON public."KanjiInWords"."WordId" = public."Words"."WordId"
      LEFT OUTER JOIN public."Kanji" ON public."KanjiInWords"."KanjiId" = public."Kanji"."KanjiId"
      WHERE public."Words"."Word" = ${search}
      OR public."Words"."Reading" = ${search}
      OR public."Words"."WordId"::VARCHAR = ${search}
      OR public."Words"."Meanings"::VARCHAR LIKE '%' || LOWER(${search}) || '%'
      OR ${search} = any("Words"."OtherVariants")
      OR public."Kanji"."Character" = ${search}
      ORDER BY public."Words"."Popularity" ASC
    `;
    } else {
      const wordOrVariant = request.nextUrl.searchParams.get('w');
      const reading = request.nextUrl.searchParams.get('r');
      const meaning = request.nextUrl.searchParams.get('m');
      const kanji = request.nextUrl.searchParams.get('k');

      if (wordOrVariant === null && reading === null && meaning === null && kanji === null)
        throw new Error('no attributes provided');

      const query = taggedTemplate`
        SELECT DISTINCT public."Words".* FROM public."Words"
      `;
      if (kanji !== null)
        query.append`
          LEFT OUTER JOIN public."KanjiInWords" ON public."KanjiInWords"."WordId" = public."Words"."WordId"
          LEFT OUTER JOIN public."Kanji" ON public."KanjiInWords"."KanjiId" = public."Kanji"."KanjiId"
        `;
      query.append`
        WHERE
      `;

      let encounteredFirstStatement = false;
      const prependAnd = () => {
        if (encounteredFirstStatement) query.append`AND`;
        encounteredFirstStatement = true;
      };

      if (wordOrVariant !== null) {
        prependAnd();
        query.append`(
          public."Words"."Word" = ${wordOrVariant}
          OR ${wordOrVariant} = any("Words"."OtherVariants")
        )`;
      }
      if (reading !== null) {
        prependAnd();
        query.append`
          public."Words"."Reading" = ${reading}
        `;
      }
      if (meaning !== null) {
        prependAnd();
        query.append`
          public."Words"."Meanings"::VARCHAR LIKE '%' || LOWER(${meaning}) || '%'
        `;
      }
      if (kanji !== null) {
        prependAnd();
        query.append`
          public."Kanji"."Character" = ${kanji}
        `;
      }
      query.append`ORDER BY public."Words"."Popularity" ASC`;

      dbResponse = await sql(...query.array);
    }

    return NextResponse.json(dbResponse.rows, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};
