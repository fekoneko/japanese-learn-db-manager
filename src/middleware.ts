import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { blacklistResponse } from './data/blacklist-response';

const blacklist = ['Validator.nu/LV https://validator.w3.org/services'];

export const middleware = async (request: NextRequest, arg2: any) => {
  // SUCK IT! No validators allowed
  if (blacklist.includes(request.headers.get('User-Agent')!))
    return new NextResponse(blacklistResponse, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });

  return auth(request as any, arg2);
};
