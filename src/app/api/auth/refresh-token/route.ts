import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth.service';

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh authentication token
 *     description: Refreshes the user's authentication token.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Successfully refreshed token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid or expired refresh token
 *       500:
 *         description: Internal server error
 */
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('Invalid or missing refresh token');

    const refreshedToken = authService.generateToken({ 
      id: '', // this is not yet implemented. // check
      email: '',
      name: '',
    });

    return NextResponse.json({ token: refreshedToken });
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'Failed to refresh token' }, { status: 500 });
  }
}
