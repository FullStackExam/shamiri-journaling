import { JournalEntryCreate, JournalEntryUpdate } from '@/lib/validation/journal';

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  entryDate: Date;
  createdAt: Date;
  updatedAt?: Date;
  categories: {
    id: string;
    name: string;
    color: string;
  }[];
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

// handle API responses and throw errors if needed
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }
  return await response.json();
}

// fetch all journal entries with pagination
export async function getJournalEntries(
  page = 1,
  limit = 10
): Promise<PaginatedResponse<JournalEntry>> {
  const response = await fetch(`/api/journal?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse<PaginatedResponse<JournalEntry>>(response);
}

// fetch a single journal entry by ID
export async function getJournalEntryById(id: string): Promise<JournalEntry> {
  const response = await fetch(`/api/journal/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse<JournalEntry>(response);
}

// create a new journal entry
export async function createJournalEntry(
  data: JournalEntryCreate
): Promise<JournalEntry> {
  const response = await fetch('/api/journal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleResponse<JournalEntry>(response);
}

// update an existing journal entry
export async function updateJournalEntry(
  id: string,
  data: JournalEntryUpdate
): Promise<JournalEntry> {
  const response = await fetch(`/api/journal/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleResponse<JournalEntry>(response);
}

// delete a journal entry
export async function deleteJournalEntry(id: string): Promise<void> {
  const response = await fetch(`/api/journal/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  await handleResponse<void>(response); // Ensure error handling
}

// search journal entries with query parameters
export async function searchJournalEntries(
  query?: string,
  categories?: string[],
  startDate?: Date,
  endDate?: Date,
  page = 1,
  limit = 10
): Promise<PaginatedResponse<JournalEntry>> {
  const params = new URLSearchParams();
  
  if (query) {
    params.append('q', query);
  }
  
  if (categories && categories.length > 0) {
    categories.forEach((category) => params.append('categories', category));
  }
  console.log(categories)
  
  if (startDate) {
    params.append('startDate', startDate.toISOString());
  }
  
  if (endDate) {
    params.append('endDate', endDate.toISOString());
  }
  
  // Always include pagination parameters
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  
  const response = await fetch(`/api/journal/search?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse<PaginatedResponse<JournalEntry>>(response);
}
