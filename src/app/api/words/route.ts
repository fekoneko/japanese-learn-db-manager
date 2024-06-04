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
      VALUES (${requestBody.Word}, ${requestBody.Reading}, ${requestBody.PitchAccents as any}, ${requestBody.Meanings as any}, ${requestBody.Popularity}, ${requestBody.OtherVariants as any})
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

export const DELETE = async (request: NextRequest) => {
  try {
    const wordId = +(request.nextUrl.searchParams.get('id') ?? 'null');
    if (isNaN(wordId))
      return NextResponse.json({ error: 'Provided ID is invalid' }, { status: 400 });

    await sql`
      DELETE FROM public."Words"
      WHERE "WordId"=${wordId}
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
      SELECT DISTINCT public."Words".*, public."Kanji"."Character" AS "KanjiCharacter", public."Kanji"."KanjiId" AS "KanjiId" FROM public."Words"
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

      const query = taggedTemplate`
        SELECT DISTINCT public."Words".*, public."Kanji"."Character" AS "KanjiCharacter", public."Kanji"."KanjiId" AS "KanjiId" FROM public."Words"
        LEFT OUTER JOIN public."KanjiInWords" ON public."KanjiInWords"."WordId" = public."Words"."WordId"
        LEFT OUTER JOIN public."Kanji" ON public."KanjiInWords"."KanjiId" = public."Kanji"."KanjiId"
      `;
      if (wordOrVariant || reading || meaning || kanji)
        query.append`
          WHERE
        `;

      let encounteredFirstStatement = false;
      const prependAnd = () => {
        if (encounteredFirstStatement) query.append`AND`;
        encounteredFirstStatement = true;
      };

      if (wordOrVariant) {
        prependAnd();
        query.append`(
          public."Words"."Word" = ${wordOrVariant}
          OR ${wordOrVariant} = any("Words"."OtherVariants")
        )`;
      }
      if (reading) {
        prependAnd();
        query.append`
          public."Words"."Reading" = ${reading}
        `;
      }
      if (meaning) {
        prependAnd();
        query.append`
          public."Words"."Meanings"::VARCHAR LIKE '%' || LOWER(${meaning}) || '%'
        `;
      }
      if (kanji) {
        prependAnd();
        query.append`
          public."Kanji"."Character" = ${kanji}
        `;
      }
      query.append`ORDER BY public."Words"."Popularity" ASC`;

      dbResponse = await sql(...query.array);
    }

    const resultWords: Word[] = [];
    let IndexOfFirstWordOccurence = -1;
    dbResponse.rows.forEach((row, index, rows) => {
      if (
        IndexOfFirstWordOccurence !== -1 &&
        row.WordId === rows[IndexOfFirstWordOccurence].WordId
      ) {
        resultWords[resultWords.length - 1].KanjiIds?.push(row.KanjiId);
        resultWords[resultWords.length - 1].KanjiCharacters?.push(row.KanjiCharacter);
      } else {
        const word: Word = {
          WordId: row.WordId,
          Word: row.Word,
          Reading: row.Reading,
        };
        if (row.PitchAccents !== null) word.PitchAccents = row.PitchAccents;
        if (row.Meanings !== null) word.Meanings = row.Meanings;
        if (row.Popularity !== null) word.Popularity = row.Popularity;
        if (row.OtherVariants !== null) word.OtherVariants = row.OtherVariants;
        if (row.KanjiId !== null) word.KanjiIds = [row.KanjiId];
        if (row.KanjiCharacter !== null) word.KanjiCharacters = [row.KanjiCharacter];
        resultWords.push(word);
        IndexOfFirstWordOccurence = index;
      }
    });

    return NextResponse.json(resultWords, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};
