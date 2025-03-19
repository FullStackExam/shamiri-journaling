import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import { authService } from '@/services/auth.service';

const CSRF_SECRET = process.env.CSRF_SECRET;


export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

/**
 * Middleware to authenticate requests using JWT
 */
export async function authenticateRequest(
  req: NextRequest
): Promise<NextResponse | AuthenticatedRequest> {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized - No token provided' },
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = authService.verifyToken(token);

    // Attach user to request
    const authenticatedReq = req as AuthenticatedRequest;
    authenticatedReq.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    };

    return authenticatedReq;
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Unauthorized - Invalid token' },
      { status: 401 }
    );
  }
}

/**
 * Helper function to get authenticated user from request
 * For use in route handlers after calling authenticateRequest
 */
export function getAuthUser(
  reqOrRes: NextResponse | AuthenticatedRequest
): { id: string; email: string; name: string } {
  if (reqOrRes instanceof NextResponse) {
    throw new Error('Request is not authenticated');
  }

  if (!reqOrRes.user) {
    throw new Error('User not found in request');
  }

  return reqOrRes.user;
}




const CSRF_COOKIE_NAME = process.env.CSRF_COOKIE_NAME;

export async function verifyCSRF(req: NextRequest) {
  const csrfTokenFromRequest = req.headers.get('x-csrf-token');
  const csrfTokenFromCookie = req.cookies.get(CSRF_COOKIE_NAME)?.value??'';

  if (!csrfTokenFromRequest || !csrfTokenFromCookie) {
    return NextResponse.json({ error: 'CSRF token missing' }, { status: 403 });
  }

  // Compare the tokens
  if (csrfTokenFromRequest !== csrfTokenFromCookie) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }
  return null // NextResponse.next();
}