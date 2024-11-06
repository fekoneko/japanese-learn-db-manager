import { RssSourcesSchema } from '@/schemas/globals';
import { Validator } from 'jsonschema';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

const validator = new Validator();

export const getRssSources = async (): Promise<string[]> => {
  const dbResponse = await sql`SELECT * FROM public."RssSources"`;

  return dbResponse.rows.map((row) => row.Sources).flat();
};

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    if (typeof requestBody !== 'object' || !validator.validate(requestBody, RssSourcesSchema).valid)
      return NextResponse.json({ error: 'Request body is invalid' }, { status: 400 });

    await sql`DELETE FROM public."RssSources"`;

    await sql`
      INSERT INTO public."RssSources" ("Sources")
      VALUES (${requestBody.sources})
    `;

    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    return NextResponse.json(await getRssSources(), { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};
