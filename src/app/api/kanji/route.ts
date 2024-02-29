import { KanjiSchema } from '@/schemas/globals';
import taggedTemplate from '@/utilities/taggedTemplate';
import { sql } from '@vercel/postgres';
import { Validator } from 'jsonschema';
import { NextRequest, NextResponse } from 'next/server';

const validator = new Validator();

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    if (typeof requestBody !== 'object' || !validator.validate(requestBody, KanjiSchema).valid)
      return NextResponse.json({ error: 'Request body is invalid' }, { status: 400 });

    await sql`
      INSERT INTO public."Kanji" ("Character", "Onyomi", "Kunyomi", "Meaning", "Popularity")
      VALUES (${requestBody.Character}, ${requestBody.Onyomi}, ${requestBody.Kunyomi}, ${requestBody.Meaning}, ${requestBody.Popularity})
    `;

    const radicalIds: number[] | undefined = requestBody.RadicalIds;
    if (radicalIds?.length) {
      const query = taggedTemplate`
        INSERT INTO public."RadicalsInKanji" ("KanjiId", "RadicalId") VALUES
      `;
      radicalIds.forEach((radicalId, index) => {
        query.append`(CURRVAL('"Kanji_KanjiId_seq"'::REGCLASS), ${radicalId})`;
        if (index !== radicalIds.length - 1) query.append`,`;
      });
      console.log(query);
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
