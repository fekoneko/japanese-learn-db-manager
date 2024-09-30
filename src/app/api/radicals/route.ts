import { Radical } from '@/types/globals';
import { RadicalSchema } from '@/schemas/globals';
import taggedTemplate from '@/utilities/tagged-template';
import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';
import { Validator } from 'jsonschema';
import { NextRequest, NextResponse } from 'next/server';

const validator = new Validator();

export const POST = async (request: NextRequest) => {
  try {
    const requestBody: Radical = await request.json();
    if (typeof requestBody !== 'object' || !validator.validate(requestBody, RadicalSchema).valid)
      return NextResponse.json({ error: 'Request body is invalid' }, { status: 400 });

    await sql`
      INSERT INTO public."Radicals" ("Character", "CorrespondingKanjiId", "Keyword", "DictionaryCode", "OtherVariants", "Image")
      VALUES (${requestBody.Character}, ${requestBody.CorrespondingKanjiId}, ${requestBody.Keyword}, ${requestBody.DictionaryCode}, ${requestBody.OtherVariants as any}, ${requestBody.Image})
    `;

    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const radicalId = +(request.nextUrl.searchParams.get('id') ?? 'null');
    if (isNaN(radicalId))
      return NextResponse.json({ error: 'Provided ID is invalid' }, { status: 400 });

    await sql`
      DELETE FROM public."Radicals"
      WHERE "RadicalId"=${radicalId}
    `;

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
        SELECT DISTINCT public."Radicals".*, public."Kanji"."Character" AS "CorrespondingKanjiCharacter" FROM public."Radicals"
        LEFT OUTER JOIN public."Kanji" ON public."Kanji"."KanjiId" = public."Radicals"."CorrespondingKanjiId"
        WHERE public."Radicals"."Keyword" LIKE '%' || LOWER(${search}) || '%'
        OR public."Radicals"."Character" = ${search}
        OR public."Radicals"."RadicalId"::VARCHAR = ${search}
        OR public."Radicals"."DictionaryCode"::VARCHAR = ${search}
        OR public."Kanji"."Character" = ${search}
        OR ${search} = any("Radicals"."OtherVariants")
        ORDER BY public."Radicals"."RadicalId" ASC
      `;
    } else {
      const characterOrVariants = request.nextUrl.searchParams.get('c');
      const keyword = request.nextUrl.searchParams.get('m');
      const correspondingKanji = request.nextUrl.searchParams.get('k');
      const dictionaryCode = request.nextUrl.searchParams.get('d');

      const query = taggedTemplate`
        SELECT DISTINCT public."Radicals".*, public."Kanji"."Character" AS "CorrespondingKanjiCharacter" FROM public."Radicals"
        LEFT OUTER JOIN public."Kanji" ON public."Kanji"."KanjiId" = public."Radicals"."CorrespondingKanjiId"          
      `;
      if (characterOrVariants || keyword || correspondingKanji || dictionaryCode)
        query.append`
          WHERE
        `;

      let encounteredFirstStatement = false;
      const prependAnd = () => {
        if (encounteredFirstStatement) query.append`AND`;
        encounteredFirstStatement = true;
      };

      if (keyword) {
        prependAnd();
        query.append`
          public."Radicals"."Keyword" LIKE '%' || LOWER(${keyword}) || '%'
        `;
      }
      if (characterOrVariants) {
        prependAnd();
        query.append`(
          public."Radicals"."Character" = ${characterOrVariants}
          OR ${characterOrVariants} = any("Radicals"."OtherVariants")
        )`;
      }
      if (dictionaryCode) {
        prependAnd();
        query.append`
          public."Radicals"."DictionaryCode"::VARCHAR = ${dictionaryCode}
        `;
      }
      if (correspondingKanji) {
        prependAnd();
        query.append`
          public."Kanji"."Character" = ${correspondingKanji}
        `;
      }
      query.append`ORDER BY public."Radicals"."RadicalId" ASC`;

      dbResponse = await sql(...query.array);
    }

    const resultRadicals: Radical[] = [];
    dbResponse.rows.forEach((row) => {
      const radical: Radical = {
        RadicalId: row.RadicalId,
        Character: row.Character,
        Keyword: row.Keyword,
      };
      if (row.DictionaryCode !== null) radical.DictionaryCode = row.DictionaryCode;
      if (row.OtherVariants !== null) radical.OtherVariants = row.OtherVariants;
      if (row.Image !== null) radical.Image = row.Image;
      if (row.CorrespondingKanjiId !== null)
        radical.CorrespondingKanjiId = row.CorrespondingKanjiId;
      if (row.CorrespondingKanjiCharacter !== null)
        radical.CorrespondingKanjiCharacter = row.CorrespondingKanjiCharacter;
      resultRadicals.push(radical);
    });

    return NextResponse.json(resultRadicals, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};
