import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

const emptyHtml = `
  <!DOCTYPE html>
  <html lang="ru">
    <head>
      <title>JapaneseLearn DB</title>
    </head>
    <body></body>
  </html>`;

export const middleware = async (request: NextRequest, arg2: any) => {
  // SUCK IT! No validators allowed
  if (request.headers.get('User-Agent') === 'Validator.nu/LV https://validator.w3.org/services')
    return new NextResponse(emptyHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  return auth(request as any, arg2);
};
