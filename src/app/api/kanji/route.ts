import { Kanji } from '@/@types/globals';
import { KanjiSchema } from '@/schemas/globals';
import taggedTemplate from '@/utilities/taggedTemplate';
import { sql } from '@vercel/postgres';
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
    const searchValue = request.nextUrl.searchParams.get('s');

    const dbResponse = await sql`
      SELECT DISTINCT public."Kanji".* FROM public."Kanji"
      LEFT OUTER JOIN public."RadicalsInKanji" ON public."RadicalsInKanji"."KanjiId" = public."Kanji"."KanjiId"
      LEFT OUTER JOIN public."Radicals" ON public."RadicalsInKanji"."RadicalId" = public."Radicals"."RadicalId"
      WHERE public."Kanji"."Meaning" LIKE '%' || LOWER(${searchValue}) || '%'
      OR public."Kanji"."Character" = ${searchValue}
      OR public."Kanji"."KanjiId"::VARCHAR = ${searchValue}
      OR public."Radicals"."Character" = ${searchValue}
      OR ${searchValue} = any("Radicals"."OtherVariants")
      ORDER BY public."Kanji"."Popularity" ASC
    `;

    return NextResponse.json(dbResponse.rows, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};
