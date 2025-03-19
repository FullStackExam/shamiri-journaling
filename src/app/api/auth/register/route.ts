import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth.service';
import { registerSchema } from '@/lib/validation/auth';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = registerSchema.parse(body);
    const user = await authService.register(validatedData);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === 'User with this email already exists') {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}