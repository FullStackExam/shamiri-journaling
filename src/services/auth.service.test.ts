import jwt from 'jsonwebtoken'; 
import bcryptjs from 'bcryptjs';
import { RegisterInput, LoginInput } from '@/lib/validation/auth';
import prisma from '@/lib/prisma/client'; 
import { AuthService } from './auth.service';


// Mock necessary modules
jest.mock('@/lib/prisma/client', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(), 
}));

describe('AuthService', () => {
  let authService: AuthService;

  // This runs before each test case
  beforeEach(() => {
    authService = new AuthService(); // Re-initialize the auth service for each test
  });

  it('should register a new user successfully', async () => {
    // Mock input for registration
    const input: RegisterInput = {
      email: 'test@example.com',
      password: 'password123',
      name: 'John Doe',
    };

    // Mock Prisma response
    const mockUser = { id: '1', email: input.email, name: input.name, createdAt: new Date() };
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    // Call the register method
    const result = await authService.register(input);

    // Assert the results
    expect(result).toHaveProperty('id');
    expect(result.email).toBe(input.email);
    expect(result.name).toBe(input.name);
  });

  it('should fail when registering with an existing email', async () => {
    // Mock input for registration
    const input: RegisterInput = {
      email: 'test@example.com',
      password: 'password123',
      name: 'John Doe',
    };

    // Mock Prisma to simulate existing user
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

    // Try registering with an existing email and expect an error
    await expect(authService.register(input)).rejects.toThrow('User with this email already exists');
  });

  it('should login successfully with correct credentials', async () => {
    // Mock input for login
    const input: LoginInput = {
      email: 'test@example.com',
      password: 'password123',
    };

    // Mock user data from Prisma
    const mockUser = { id: '1', email: input.email, name: 'John Doe', passwordHash: 'hashedPassword' };
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    // Mock password comparison to always return true
    (bcryptjs.compare as jest.Mock).mockResolvedValue(true);

    // Mock JWT token generation
    (jwt.sign as jest.Mock).mockReturnValue('mockedJWTToken');

    // Call the login method
    const { token, csrfToken } = await authService.login(input);

    // Assert the results
    expect(token).toStrictEqual({"access": "mockedJWTToken", "refresh": "mockedJWTToken"});
    expect(csrfToken).toBeDefined(); // CSRF token should be returned as well
  });

  it('should fail login with incorrect credentials', async () => {
    // Mock input for login
    const input: LoginInput = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    // Mock Prisma response
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '1',
      email: input.email,
      name: 'John Doe',
      passwordHash: 'hashedPassword',
    });

    // Mock password comparison to always return false
    (bcryptjs.compare as jest.Mock).mockResolvedValue(false);

    // Call the login method and expect an error
    await expect(authService.login(input)).rejects.toThrow('Invalid credentials');
  });

  it('should generate a valid JWT token', () => {
    const payload = { id: '1', email: 'test@example.com', name: 'John Doe' };
    
    // Mock JWT sign method
    (jwt.sign as jest.Mock).mockReturnValue('mockedAccessToken');
    
    const { access, refresh } = authService.generateToken(payload);
    
    // Assert the generated tokens
    expect(access).toBe('mockedAccessToken');
    expect(refresh).toBeDefined();
  });

  it('should verify a valid JWT token', () => {
    const token = 'mockedToken';
    const decodedPayload = { id: '1', email: 'test@example.com', name: 'John Doe' };
    
    // Mock JWT verify method
    (jwt.verify as jest.Mock).mockReturnValue(decodedPayload);
    
    const result = authService.verifyToken(token);
    
    // Assert the decoded token
    expect(result).toEqual(decodedPayload);
  });

  it('should fail to verify an invalid JWT token', () => {
    const token = 'invalidToken';
    
    // Mock JWT verify method to throw an error
    (jwt.verify as jest.Mock).mockImplementation(() => { throw new Error('Invalid or expired token'); });
    
    // Call verifyToken and expect an error
    expect(() => authService.verifyToken(token)).toThrow('Invalid or expired token');
  });
});
