import { RadicalSchema } from '@/schemas/globals';
import { sql } from '@vercel/postgres';
import { Validator } from 'jsonschema';
import { NextResponse } from 'next/server';

const validator = new Validator();

export const POST = async (request: Request) => {
  try {
    const requestBody = await request.json();
    if (typeof requestBody !== 'object' || !validator.validate(requestBody, RadicalSchema).valid)
      return NextResponse.json({ error: 'Request body is invalid' }, { status: 400 });

    const result = await sql`
      INSERT INTO public."Radicals" ("Character", "CorrespondingKanjiId", "Keyword", "DictionaryCode", "OtherVariants")
      VALUES (${requestBody.Character}, ${requestBody.CorrespondingKanjiId}, ${requestBody.Keyword}, ${requestBody.DictionaryCode}, ${requestBody.OtherVariants})
    `;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};
