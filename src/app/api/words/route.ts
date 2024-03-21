import { Word } from '@/@types/globals';
import { WordSchema } from '@/schemas/globals';
import taggedTemplate from '@/utilities/taggedTemplate';
import { sql } from '@vercel/postgres';
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
    const searchValue = request.nextUrl.searchParams.get('s');

    const dbResponse = await sql`
      SELECT DISTINCT public."Words".* FROM public."Words"
      LEFT OUTER JOIN public."KanjiInWords" ON public."KanjiInWords"."WordId" = public."Words"."WordId"
      LEFT OUTER JOIN public."Kanji" ON public."KanjiInWords"."KanjiId" = public."Kanji"."KanjiId"
      WHERE public."Words"."Word" = ${searchValue}
      OR public."Words"."Reading" = ${searchValue}
      OR public."Words"."WordId"::VARCHAR = ${searchValue}
      OR public."Words"."Meanings"::VARCHAR LIKE '%' || LOWER(${searchValue}) || '%'
      OR ${searchValue} = any("Words"."OtherVariants")
      OR public."Kanji"."Character" = ${searchValue}
      ORDER BY public."Words"."Popularity" ASC
    `;

    return NextResponse.json(dbResponse.rows, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};
