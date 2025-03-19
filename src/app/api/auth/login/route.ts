import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth.service';
import { loginSchema } from '@/lib/validation/auth';
import { ZodError } from 'zod';
import { verifyCSRF } from '@/lib/auth/middleware'; 

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User login operations
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user with email and password, returning a JWT token and user information if successful.
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
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                 token:
 *                   type: string
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
export async function POST(req: NextRequest) {
  try {
    const csrfError = await verifyCSRF(req);
    if (csrfError instanceof NextResponse) {
      return csrfError;
    }
    const body = await req.json();
    const validatedData = loginSchema.parse(body);
    
    const { token, csrfToken } = await authService.login(validatedData);
    
    const res = NextResponse.json(token);
    
    // Set HTTP-only cookies
    authService.setAuthCookies(res, token.access, csrfToken);

    return res;
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