import { PrismaClient } from '@prisma/client';
import { Category, CategoryCreate, CategoryUpdate, PaginatedResponse, Entry } from '@/lib/validation/category';

const prisma = new PrismaClient();

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    } catch (e) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  }
  
  if (response.status === 204) {
    return {} as T; 
  }

  return await response.json();
}

export async function getCategories(userId: string): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    where: {
      userId: userId,  
    },
  });
  return categories;
}

export async function createCategory(userId: string, data: CategoryCreate): Promise<Category> {
  const category = await prisma.category.create({
    data: {
      ...data,
      userId: userId,
    },
  });
  return category;
}

export async function getCategoryById(userId: string, id: string): Promise<Category | null> {
  const category = await prisma.category.findFirst({
    where: {
      id: id,
      userId: userId, 
    },
  });
  return category;
}

export async function updateCategory(userId: string, id: string, data: CategoryUpdate): Promise<Category | null> {
  const category = await prisma.category.updateMany({
    where: {
      id: id,
      userId: userId, 
    },
    data: data,
  });
  return category;
}

export async function deleteCategory(userId: string, id: string): Promise<void> {
  const category = await prisma.category.deleteMany({
    where: {
      id: id,
      userId: userId, 
    },
  });

  if (!category.count) {
    throw new Error('Category not found or does not belong to this user');
  }
}

export async function getCategoryEntries(userId: string, categoryId: string, page = 1, limit = 10): Promise<PaginatedResponse<Entry>> {
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: userId, 
      entryCategories: {
        some: {
          categoryId: categoryId, 
        },
      },
    },
    skip: (page - 1) * limit, 
    take: limit, 
  });

  const total = await prisma.journalEntry.count({
    where: {
      userId: userId,
      entryCategories: {
        some: {
          categoryId: categoryId,
        },
      },
    },
  });

  return {
    entries,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
}
