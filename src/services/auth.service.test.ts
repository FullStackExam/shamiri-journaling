import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from './auth.service';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock prisma client
vi.mock('@/lib/prisma/client', () => {
  return {
    default: {
      user: {
        findUnique: vi.fn(),
        create: vi.fn(),
      },
    },
  };
});

// Mock bcrypt
vi.mock('bcrypt', () => ({
  hash: vi.fn().mockResolvedValue('hashed_password'),
  compare: vi.fn().mockResolvedValue(true),
}));

// Mock jsonwebtoken
vi.mock('jsonwebtoken', () => ({
  sign: vi.fn().mockReturnValue('mocked_token'),
  verify: vi.fn().mockReturnValue({ id: 'user_id', email: 'test@example.com', name: 'Test User' }),
}));

// Mock environment variables
vi.stubEnv('JWT_SECRET', 'test_secret');

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: any;

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();
    
    // Get the prisma mock
    prisma = require('@/lib/prisma/client').default;
    
    // Create a new instance of AuthService for each test
    authService = new AuthService();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      // Mock user not existing
      prisma.user.findUnique.mockResolvedValue(null);
      
      // Mock user creation
      prisma.user.create.mockResolvedValue({
        id: 'user_id',
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'hashed_password',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      const result = await authService.register({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        confirmPassword: 'password123',
      });
      
      // Verify findUnique was called with correct email
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      
      // Verify hash was called with correct password
      expect(hash).toHaveBeenCalledWith('password123', 10);
      
      // Verify create was called with correct data
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          passwordHash: 'hashed_password',
          name: 'Test User',
          preferences: {},
        },
      });
      
      // Verify correct result
      expect(result).toEqual({
        id: 'user_id',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: expect.any(Date),
      });
    });
    
    it('should throw error if user with email already exists', async () => {
      // Mock user existing
      prisma.user.findUnique.mockResolvedValue({
        id: 'existing_user_id',
        email: 'test@example.com',
      });
      
      await expect(authService.register({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        confirmPassword: 'password123',
      })).rejects.toThrow('User with this email already exists');
      
      // Verify create was not called
      expect(prisma.user.create).not.toHaveBeenCalled();
    });
  });
  
  describe('login', () => {
    it('should login user successfully', async () => {
      // Mock user exists
      prisma.user.findUnique.mockResolvedValue({
        id: 'user_id',
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'hashed_password',
      });
      
      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      });
      
      // Verify correct result structure
      expect(result).toEqual({
        user: {
          id: 'user_id',
          email: 'test@example.com',
          name: 'Test User',
        },
        token: 'mocked_token',
      });
      
      // Verify JWT was signed
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: 'user_id',
          email: 'test@example.com',
          name: 'Test User',
        },
        'test_secret',
        { expiresIn: '15m' }
      );
    });
    
    it('should throw error if user not found', async () => {
      // Mock user not existing
      prisma.user.findUnique.mockResolvedValue(null);
      
      await expect(authService.login({
        email: 'nonexistent@example.com',
        password: 'password123',
      })).rejects.toThrow('Invalid credentials');
    });
  });
  
  describe('verifyToken', () => {
    it('should verify token and return payload', () => {
      const result = authService.verifyToken('valid_token');
      
      expect(result).toEqual({
        id: 'user_id',
        email: 'test@example.com',
        name: 'Test User',
      });
      
      expect(jwt.verify).toHaveBeenCalledWith('valid_token', 'test_secret');
    });
    
    it('should throw error if token is invalid', () => {
      // Mock verify throwing error
      jwt.verify.mockImplementationOnce(() => {
        throw new Error('Invalid token');
      });
      
      expect(() => authService.verifyToken('invalid_token')).toThrow('Invalid token');
    });
  });
});