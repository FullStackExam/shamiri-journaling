import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth.service';

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