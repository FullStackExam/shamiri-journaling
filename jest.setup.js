process.env.JWT_SECRET = 'JWT_SECRET';
process.env.CSRF_SECRET = 'CSRF_SECRET';

const fetchMock = require('jest-fetch-mock'); // Use require instead of import
fetchMock.enableMocks();