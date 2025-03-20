export const sign = jest.fn().mockReturnValue('mocked-jwt-token');
export const verify = jest.fn().mockReturnValue({ id: '123', email: 'test@example.com', name: 'Test User' });
