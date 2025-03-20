import { z } from 'zod';

// Schema for creating a new journal entry
export const journalEntrySchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  content: z.string().min(1, 'Content is required'),
  entryDate: z.coerce.date(),
  categoryIds: z.array(z.string().uuid()).optional(),
});

// Schema for updating an existing journal entry
export const journalEntryUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  content: z.string().min(1, 'Content is required'),
  entryDate: z.coerce.date(),
  categoryIds: z.array(z.string().uuid()).optional(),
});

// Schema for searching journal entries
export const journalSearchSchema = z.object({
  q: z.string().optional(),
  categories: z.array(z.string().uuid()).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
});

// Types derived from schemas
export type JournalEntryCreate = z.infer<typeof journalEntrySchema>;
export type JournalEntryUpdate = z.infer<typeof journalEntryUpdateSchema>;
export type JournalSearch = z.infer<typeof journalSearchSchema>;