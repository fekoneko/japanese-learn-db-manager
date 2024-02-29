import { WordSchema } from '@/schemas/globals';
import { sql } from '@vercel/postgres';
import { Validator } from 'jsonschema';
import { NextResponse } from 'next/server';

const validator = new Validator();

export const POST = async (request: Request) => {
  try {
    const requestBody = await request.json();
    if (typeof requestBody !== 'object' || !validator.validate(requestBody, WordSchema).valid)
      return NextResponse.json({ error: 'Request body is invalid' }, { status: 400 });

    const dbResponse = await sql`
      INSERT INTO public."Words" ("Word", "Reading", "PitchAccents", "Meanings", "Popularity", "OtherVariants")
      VALUES (${requestBody.Word}, ${requestBody.Reading}, ${requestBody.PitchAccents}, ${requestBody.Meanings}, ${requestBody.Popularity}, ${requestBody.OtherVariants})
    `;

    return NextResponse.json(dbResponse, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};
