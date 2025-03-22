import { z } from 'zod';

export interface Category {
    id: string;
    name: string;
    color: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CategoryCreate {
    name: string;
    color: string;
  }
  
  export interface CategoryUpdate {
    name?: string;
    color?: string;
  }
  
  export interface Entry {
    id: string;
    title: string;
    content: string;
    entryDate: Date;
    categories: Category[];
  }
  
  export interface PaginatedResponse<T> {
    entries: T[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  }


// Schema for creating a new category
export const categoryCreateSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  color: z.string().min(3, 'Color must be at least 3 characters long'),
});

// Schema for updating an existing category
export const categoryUpdateSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long').optional(),
  color: z.string().min(3, 'Color must be at least 3 characters long').optional(),
});

// Schema for validating a category object
export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

// Schema for validating an entry object
export const entrySchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  entryDate: z.date(),
  categories: z.array(categorySchema),
});

// Paginated response schema for entries
export const paginatedResponseSchema = <T>(itemSchema: z.ZodType<T, any>) =>
  z.object({
    entries: z.array(itemSchema),
    pagination: z.object({
      total: z.number(),
      page: z.number(),
      limit: z.number(),
      pages: z.number(),
    }),
  });

  