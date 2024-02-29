import { WordSchema } from '@/schemas/globals';
import taggedTemplate from '@/utilities/taggedTemplate';
import { sql } from '@vercel/postgres';
import { Validator } from 'jsonschema';
import { NextRequest, NextResponse } from 'next/server';

const validator = new Validator();

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    if (typeof requestBody !== 'object' || !validator.validate(requestBody, WordSchema).valid)
      return NextResponse.json({ error: 'Request body is invalid' }, { status: 400 });

    await sql`
      INSERT INTO public."Words" ("Word", "Reading", "PitchAccents", "Meanings", "Popularity", "OtherVariants")
      VALUES (${requestBody.Word}, ${requestBody.Reading}, ${requestBody.PitchAccents}, ${requestBody.Meanings}, ${requestBody.Popularity}, ${requestBody.OtherVariants})
    `;

    const kanjiIds: number[] | undefined = requestBody.KanjiIds;
    if (kanjiIds?.length) {
      const query = taggedTemplate`
        INSERT INTO public."KanjiInWords" ("WordId", "KanjiId") VALUES
      `;
      kanjiIds.forEach((kanjiId, index) => {
        query.append`(CURRVAL('"Words_WordId_seq"'::REGCLASS), ${kanjiId})`;
        if (index !== kanjiIds.length - 1) query.append`,`;
      });
      console.log(query);
      await sql(...query.array);
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};
