import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, getAuthUser } from '@/lib/auth/middleware';
import { authService } from '@/services/auth.service';

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get authenticated user's profile
 *     description: Fetches the authenticated user's profile.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *       401:
 *         description: Unauthorized (No token or invalid token)
 *       500:
 *         description: Internal server error
 */
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
