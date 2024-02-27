import { WordSchema } from '@/schemas/globals';
import { sql } from '@vercel/postgres';
import { Validator } from 'jsonschema';
import { NextResponse } from 'next/server';

const validator = new Validator();

export const POST = async (request: Request) => {
  try {
    const requestBody = await request.json();
    if (typeof requestBody !== 'object') throw new Error('Request body is empty');
    validator.validate(requestBody, WordSchema);

    const result = await sql`
      INSERT INTO public."Words" ("Word", "Reading", "PitchAccents", "Meanings", "Popularity", "OtherVariants")
      VALUES (${requestBody.Word}, ${requestBody.Reading}, ${requestBody.PitchAccents}, ${requestBody.Meanings}, ${requestBody.Popularity}, ${requestBody.OtherVariants})
    `;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};
