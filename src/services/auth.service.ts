import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma/client';
import { RegisterInput, LoginInput } from '@/lib/validation/auth';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

if (!process.env.CSRF_SECRET) {
  throw new Error('CSRF_SECRET is not defined in environment variables');
}

const JWT_SECRET = process.env.JWT_SECRET;
const CSRF_SECRET = process.env.CSRF_SECRET;
const JWT_EXPIRES_IN = '15m'; // JWT expires in 15 minutes
const JWT_REFRESH_EXPIRES_IN = '7d';
const SALT_ROUNDS = 10;

export interface TokenPayload {
  id: string;
  email: string;
  name: string;
}

export class AuthService {
  /**
   * Register a new user
   */
  async register(input: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const passwordHash = await hash(input.password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email: input.email,
        passwordHash,
        name: input.name,
        preferences: {},
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  /**
   * Login user with email and password
   */
  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await compare(input.password, user.passwordHash);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    const csrfToken = this.generateCSRFToken();

    return {
      token,
      csrfToken,
    };
  }

  /**
   * Generate JWT token
   */
  generateToken(payload: TokenPayload): { access: string, refresh: string } {
    // Generate Access Token
    const access = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Generate Refresh Token
    const refresh = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

    return { access, refresh };
  }

  /**
   * Generate CSRF token
   */
  generateCSRFToken(): string {
    return jwt.sign({}, CSRF_SECRET, { expiresIn: '1d' });
  }

  /**
   * Set JWT and CSRF token as cookies (HTTP-only)
   */
  setAuthCookies(res: any, token: string, csrfToken: string) {
    res.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,  // 1 week expiration
      path: '/',
      sameSite: 'Strict',  // Recommended for security
    });

    res.cookies.set('csrf_token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,  // 1 day expiration
      path: '/',
      sameSite: 'Strict',  // Recommended for security
    });
  }

  /**
   * Verify JWT token
   */
  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }
}
// singleton
export const authService = new AuthService();
