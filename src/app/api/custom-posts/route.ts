import { CustomPostSchema } from '@/schemas/globals';
import { Validator } from 'jsonschema';
import { NextRequest, NextResponse } from 'next/server';
import { CustomPost } from '@/types/globals';
import { sql } from '@vercel/postgres';

const validator = new Validator();

export const getCustomPosts = async (): Promise<CustomPost[]> => {
  const dbResponse = await sql`SELECT * FROM public."CustomPosts"`;

  return dbResponse.rows.map((row) => ({
    title: row.Title,
    content: row.Content,
    date: new Date(row.Date),
  }));
};

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    if (typeof requestBody !== 'object' || !validator.validate(requestBody, CustomPostSchema).valid)
      return NextResponse.json({ error: 'Request body is invalid' }, { status: 400 });

    await sql`
      INSERT INTO public."CustomPosts" ("Title", "Content", "Date")
      VALUES (${requestBody.title}, ${requestBody.content}, ${new Date().toISOString()})
    `;

    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    return NextResponse.json(await getCustomPosts(), { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 });
  }
};
