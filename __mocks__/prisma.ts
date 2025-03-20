const prisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };
  
  export default prisma;
  