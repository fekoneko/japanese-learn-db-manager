import { Word } from '@/@types/globals';
import mySqlConnection from '@/lib/mySqlConnection';
import { WordSchema } from '@/schemas/globals';
import { Validator } from 'jsonschema';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const validator = new Validator();

export const POST = async (request: NextRequest) => {
  try {
    const requestBody: Word = await request.json();
    if (typeof requestBody !== 'object' || !validator.validate(requestBody, WordSchema).valid)
      return NextResponse.json({ error: 'Request body is invalid' }, { status: 400 });

    const connection = await mySqlConnection;
    await connection.query(
      `INSERT INTO Words (Word, Reading, PitchAccents, Meanings, Popularity, OtherVariants)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        requestBody.Word,
        requestBody.Reading,
        requestBody.PitchAccents?.length ? `{"${requestBody.PitchAccents.join('","')}"}` : null,
        requestBody.Meanings?.length ? `{"${requestBody.Meanings.join('","')}"}` : null,
        requestBody.Popularity,
        requestBody.OtherVariants?.length ? `{"${requestBody.OtherVariants.join('","')}"}` : null,
      ],
    );

    const kanjiIds = requestBody.KanjiIds;
    if (kanjiIds?.length) {
      let query = `
        INSERT INTO KanjiInWords (WordId, KanjiId) VALUES
      `;
      let args: any[] = [];
      kanjiIds.forEach((kanjiId, index) => {
        query += `(LAST_INSERT_ID(), ?)`;
        args.push(kanjiId);
        if (index !== kanjiIds.length - 1) query += `,`;
      });
      await connection.query(query, args);
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

    const connection = await mySqlConnection;
    await connection.query(
      `DELETE FROM Words
      WHERE WordId = ?`,
      [wordId],
    );

    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const search = request.nextUrl.searchParams.get('s');
    let dbResponse: any;
    const connection = await mySqlConnection;

    if (search !== null) {
      if (search === '') {
        [dbResponse] = await connection.query(
          `SELECT * from Words
          ORDER BY Words.Popularity ASC`,
          [],
        );
      } else {
        const lowercaseSearch = search.toLowerCase();
        [dbResponse] = await connection.query(
          `SELECT DISTINCT Words.*, Kanji.\`Character\` AS KanjiCharacter, Kanji.KanjiId AS KanjiId FROM Words
          LEFT OUTER JOIN KanjiInWords ON KanjiInWords.WordId = Words.WordId
          LEFT OUTER JOIN Kanji ON KanjiInWords.KanjiId = Kanji.KanjiId
          WHERE Words.Word = ?
          OR Words.Reading = ?
          OR Words.WordId = ?
          OR Words.Meanings LIKE '%${lowercaseSearch}%'
          OR Words.OtherVariants LIKE '%${lowercaseSearch}%'
          OR Kanji.Character = ?
          ORDER BY Words.Popularity ASC`,
          new Array(5).fill(lowercaseSearch),
        );
      }
    } else {
      const wordOrVariant = request.nextUrl.searchParams.get('w');
      const reading = request.nextUrl.searchParams.get('r');
      const meaning = request.nextUrl.searchParams.get('m');
      const kanji = request.nextUrl.searchParams.get('k');

      let query = `
        SELECT DISTINCT Words.*, Kanji.\`Character\` AS KanjiCharacter, Kanji.KanjiId AS KanjiId FROM Words
        LEFT OUTER JOIN KanjiInWords ON KanjiInWords.WordId = Words.WordId
        LEFT OUTER JOIN Kanji ON KanjiInWords.KanjiId = Kanji.KanjiId
      `;
      let args = [];
      if (wordOrVariant || reading || meaning || kanji)
        query += `
          WHERE
        `;

      let encounteredFirstStatement = false;
      const prependAnd = () => {
        if (encounteredFirstStatement) query += `AND`;
        encounteredFirstStatement = true;
      };

      if (wordOrVariant) {
        prependAnd();
        query += `(
          Words.Word = ?
          OR Words.OtherVariants LIKE '%' || ? || '%'
        )`;
        args.push(wordOrVariant, wordOrVariant);
      }
      if (reading) {
        prependAnd();
        query += `
          Words."Reading" = ?
        `;
        args.push(reading);
      }
      if (meaning) {
        prependAnd();
        query += `
          OR Words.Meanings LIKE '%' || ? || '%'
        `;
        args.push(meaning);
      }
      if (kanji) {
        prependAnd();
        query += `
          Kanji.\`Character\` = ?
        `;
        args.push(kanji);
      }
      query += `ORDER BY Words.Popularity ASC`;

      [dbResponse] = await connection.query(query, args);
    }

    const resultWords: Word[] = [];
    let IndexOfFirstWordOccurence = -1;
    console.log(dbResponse);
    dbResponse.forEach((row: any, index: number, rows: any) => {
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
        if (row.PitchAccents !== null)
          word.PitchAccents = row.PitchAccents.slice(2, -2)
            .split('","')
            .map((accent: any) => +accent);
        if (row.Meanings !== null) word.Meanings = row.Meanings.slice(2, -2).split('","');
        if (row.Popularity !== null) word.Popularity = row.Popularity;
        if (row.OtherVariants !== null)
          word.OtherVariants = row.OtherVariants.slice(2, -2).split('","');
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
