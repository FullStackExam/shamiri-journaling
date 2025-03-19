import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma/client';
import { LoginInput, RegisterInput } from '@/lib/validation/auth';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '15m';
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
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const passwordHash = await hash(input.password, SALT_ROUNDS);

    // Create new user
    const user = await prisma.user.create({
      data: {
        email: input.email,
        passwordHash,
        name: input.name,
        preferences: {}
      },
    });

    // Return user
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
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const passwordMatch = await compare(input.password, user.passwordHash);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    // Return user and token
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  /**
   * Verify JWT token
   */
  verifyToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Generate JWT token
   */
  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
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

// singleton instance
export const authService = new AuthService();