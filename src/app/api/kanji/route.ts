import { KanjiSchema } from '@/schemas/globals';
import { sql } from '@vercel/postgres';
import { Validator } from 'jsonschema';
import { NextRequest, NextResponse } from 'next/server';

const validator = new Validator();

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    if (typeof requestBody !== 'object' || !validator.validate(requestBody, KanjiSchema).valid)
      return NextResponse.json({ error: 'Request body is invalid' }, { status: 400 });

    const dbResponse = await sql`
      INSERT INTO public."Kanji" ("Character", "Onyomi", "Kunyomi", "Meaning", "Popularity")
      VALUES (${requestBody.Character}, ${requestBody.Onyomi}, ${requestBody.Kunyomi}, ${requestBody.Meaning}, ${requestBody.Popularity})
    `;

    return NextResponse.json(dbResponse, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const searchValue = request.nextUrl.searchParams.get('s');

    const dbResponse = await sql`
      SELECT DISTINCT "Kanji".* FROM "Kanji"
      JOIN "RadicalsInKanji" ON "RadicalsInKanji"."KanjiId" = "Kanji"."KanjiId"
      JOIN "Radicals" ON "RadicalsInKanji"."RadicalId" = "Radicals"."RadicalId"
      WHERE "Meaning" LIKE '%' || LOWER(${searchValue}) || '%'
      OR "Kanji"."Character" = ${searchValue}
      OR "Radicals"."Character" = ${searchValue}
      OR ${searchValue} = any("Radicals"."OtherVariants")
      ORDER BY "Kanji"."Popularity" ASC
    `;

    return NextResponse.json(dbResponse.rows, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};
