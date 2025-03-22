// File: __tests__/categoryService.test.ts

import { PrismaClient } from '@prisma/client';
import * as categoryService from '@/services/category.service'; // Adjust this path as per your file structure

// Mocking Prisma Client methods
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      category: {
        findMany: jest.fn(),
        create: jest.fn(),
        findFirst: jest.fn(),
        updateMany: jest.fn(),
        deleteMany: jest.fn(),
      },
      journalEntry: {
        findMany: jest.fn(),
        count: jest.fn(),
      },
    })),
  };
});

// Mock instance of PrismaClient
const prisma = new PrismaClient();

describe('Category Service', () => {
  const userId = 'user-123';
  const categoryId = 'category-123';
  const categoryData = {
    name: 'Work',
    color: 'blue',
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clears all mocks before each test
  });

  it('should fetch all categories for a user', async () => {
    // Mocking the `findMany` function to return mock categories
    prisma.category.findMany.mockResolvedValue([
      { id: '1', name: 'Work', color: 'blue', userId, createdAt: new Date(), updatedAt: new Date() },
      { id: '2', name: 'Personal', color: 'green', userId, createdAt: new Date(), updatedAt: new Date() },
    ]);

    const categories = await categoryService.getCategories(userId);
    expect(categories).toHaveLength(2);
    expect(categories[0].name).toBe('Work');
  });

  it('should create a new category', async () => {
    // Mocking `create` to return a created category
    prisma.category.create.mockResolvedValue({
      id: categoryId,
      name: 'Work',
      color: 'blue',
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newCategory = await categoryService.createCategory(userId, categoryData);

    expect(newCategory).toHaveProperty('id');
    expect(newCategory.name).toBe('Work');
    expect(newCategory.color).toBe('blue');
  });

  it('should fetch a category by ID', async () => {
    // Mocking `findFirst` to return a single category
    prisma.category.findFirst.mockResolvedValue({
      id: categoryId,
      name: 'Work',
      color: 'blue',
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const category = await categoryService.getCategoryById(userId, categoryId);
    expect(category).toBeTruthy();
    expect(category.name).toBe('Work');
  });

  it('should return null if category is not found', async () => {
    // Mocking `findFirst` to return null (no category found)
    prisma.category.findFirst.mockResolvedValue(null);

    const category = await categoryService.getCategoryById(userId, categoryId);
    expect(category).toBeNull();
  });

  it('should update a category', async () => {
    // Mocking `updateMany` to return an updated category
    prisma.category.updateMany.mockResolvedValue({
      id: categoryId,
      name: 'Updated Work',
      color: 'blue',
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const updatedCategory = await categoryService.updateCategory(userId, categoryId, { name: 'Updated Work' });
    expect(updatedCategory.name).toBe('Updated Work');
  });

  it('should delete a category', async () => {
    // Mocking `deleteMany` to simulate a successful delete
    prisma.category.deleteMany.mockResolvedValue({ count: 1 });

    await expect(categoryService.deleteCategory(userId, categoryId)).resolves.not.toThrow();
  });

  it('should throw an error when trying to delete a non-existent category', async () => {
    // Mocking `deleteMany` to simulate a failed delete (category not found)
    prisma.category.deleteMany.mockResolvedValue({ count: 0 });

    await expect(categoryService.deleteCategory(userId, categoryId)).rejects.toThrow('Category not found or does not belong to this user');
  });

  it('should fetch entries for a category', async () => {
    // Mocking `findMany` and `count` to simulate fetching entries for a category
    prisma.journalEntry.findMany.mockResolvedValue([
      { id: 'entry-1', title: 'Entry 1', content: 'Content 1', entryDate: new Date(), categories: [] },
    ]);
    prisma.journalEntry.count.mockResolvedValue(1);

    const entries = await categoryService.getCategoryEntries(userId, categoryId, 1, 10);
    expect(entries.entries).toHaveLength(1);
    expect(entries.pagination.total).toBe(1);
  });
});
