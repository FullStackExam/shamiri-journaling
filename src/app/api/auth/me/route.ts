import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, getAuthUser } from '@/lib/auth/middleware';
import { authService } from '@/services/auth.service';

export async function GET(req: NextRequest) {
  try {
    const authenticatedReq = await authenticateRequest(req);
    
    if (authenticatedReq instanceof NextResponse) {
      return authenticatedReq;
    }

    const user = getAuthUser(authenticatedReq);

    const userDetails = await authService.getUserById(user.id);

    return NextResponse.json({ user: userDetails });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}