import { CustomPost } from '@/types/globals';
import { sql } from '@vercel/postgres';

export const getCustomPosts = async (): Promise<CustomPost[]> => {
  const dbResponse = await sql`SELECT * FROM public."CustomPosts"`;

  return dbResponse.rows.map((row) => ({
    title: row.Title,
    content: row.Content,
    date: new Date(row.Date),
  }));
};

export const getRssSources = async (): Promise<string[]> => {
  const dbResponse = await sql`SELECT * FROM public."RssSources"`;

  return dbResponse.rows.map((row) => row.Sources).flat();
};
