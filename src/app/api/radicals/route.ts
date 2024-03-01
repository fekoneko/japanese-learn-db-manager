import { Radical } from '@/@types/globals';
import { RadicalSchema } from '@/schemas/globals';
import { sql } from '@vercel/postgres';
import { Validator } from 'jsonschema';
import { NextRequest, NextResponse } from 'next/server';

const validator = new Validator();

export const POST = async (request: NextRequest) => {
  try {
    const requestBody: Radical = await request.json();
    if (typeof requestBody !== 'object' || !validator.validate(requestBody, RadicalSchema).valid)
      return NextResponse.json({ error: 'Request body is invalid' }, { status: 400 });

    await sql`
      INSERT INTO public."Radicals" ("Character", "CorrespondingKanjiId", "Keyword", "DictionaryCode", "OtherVariants")
      VALUES (${requestBody.Character}, ${requestBody.CorrespondingKanjiId}, ${requestBody.Keyword}, ${requestBody.DictionaryCode}, ${requestBody.OtherVariants as any})
    `;

    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const searchValue = request.nextUrl.searchParams.get('s');

    const dbResponse = await sql`
      SELECT DISTINCT "Radicals".* FROM "Radicals"
      LEFT OUTER JOIN "Kanji" ON "Kanji"."KanjiId" = "Radicals"."CorrespondingKanjiId"
      WHERE "Radicals"."Keyword" LIKE '%' || LOWER(${searchValue}) || '%'
      OR "Radicals"."Character" = ${searchValue}
      OR "Radicals"."RadicalId"::VARCHAR = ${searchValue}
      OR "Kanji"."Character" = ${searchValue}
      OR ${searchValue} = any("Radicals"."OtherVariants")
      ORDER BY "Radicals"."RadicalId" ASC
    `;

    return NextResponse.json(dbResponse.rows, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};
