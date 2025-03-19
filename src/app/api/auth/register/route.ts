import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth.service';
import { registerSchema } from '@/lib/validation/auth';
import { ZodError } from 'zod';
import { verifyCSRF } from '@/lib/auth/middleware'; 

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User registration operations
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user with email and password and returns the created user details.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully registered user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *       400:
 *         description: Validation error
 *       409:
 *         description: User with this email already exists
 *       500:
 *         description: Internal server error
 */
export async function POST(req: NextRequest) {
  try {
    // Verify CSRF token
    const csrfError = await verifyCSRF(req);
    if (csrfError instanceof NextResponse) {
      return csrfError;
    }
    // Parse and validate the body for registration
    const body = await req.json();
    const validatedData = registerSchema.parse(body);

    // Register the user
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