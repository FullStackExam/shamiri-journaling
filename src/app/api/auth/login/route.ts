import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth.service';
import { loginSchema } from '@/lib/validation/auth';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = loginSchema.parse(body);

    const { user, token } = await authService.login(validatedData);

    return NextResponse.json({
      user,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === 'Invalid credentials') {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to log in' },
      { status: 500 }
    );
  }
}