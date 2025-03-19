import { NextRequest, NextResponse } from 'next/server';
import { setCSRFToken } from '@/lib/auth/csrf'; // Function to set CSRF token in cookies

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json({ message: 'CSRF token set' });

    // Set CSRF token cookie
    return setCSRFToken(response);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to set CSRF token' }, { status: 500 });
  }
}
