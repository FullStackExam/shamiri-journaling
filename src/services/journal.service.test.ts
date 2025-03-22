import { getJournalEntries, getJournalEntryById, createJournalEntry, updateJournalEntry, deleteJournalEntry, searchJournalEntries } from './journal.service';
import fetchMock from 'jest-fetch-mock';

describe('Journal Service', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch journal entries with pagination (getJournalEntries)', async () => {
    const mockResponse = {
      entries: [
        { id: '1', title: 'Test Entry 1', content: 'Content 1', entryDate: new Date(), createdAt: new Date(), categories: [] },
        { id: '2', title: 'Test Entry 2', content: 'Content 2', entryDate: new Date(), createdAt: new Date(), categories: [] },
      ],
      pagination: { total: 2, page: 1, limit: 10, pages: 1 },
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getJournalEntries(1, 10);
    
    expect(fetchMock).toHaveBeenCalledWith('/api/journal?page=1&limit=10', expect.anything());
    expect(result).toEqual(mockResponse);
  });

  it('should fetch a single journal entry by ID (getJournalEntryById)', async () => {
    const mockResponse = {
      id: '1',
      title: 'Test Entry 1',
      content: 'Content 1',
      entryDate: new Date(),
      createdAt: new Date(),
      categories: [],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getJournalEntryById('1');

    expect(fetchMock).toHaveBeenCalledWith('/api/journal/1', expect.anything());
    expect(result).toEqual(mockResponse);
  });

  it('should create a new journal entry (createJournalEntry)', async () => {
    const mockRequestData = {
      title: 'New Entry',
      content: 'This is a new journal entry',
      entryDate: new Date(),
      categories: [],
    };

    const mockResponse = {
      id: '3',
      ...mockRequestData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await createJournalEntry(mockRequestData);

    expect(fetchMock).toHaveBeenCalledWith('/api/journal', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(mockRequestData),
    }));
    expect(result).toEqual(mockResponse);
  });

  it('should update an existing journal entry (updateJournalEntry)', async () => {
    const mockRequestData = {
      title: 'Updated Entry',
      content: 'Updated content',
    };

    const mockResponse = {
      id: '1',
      ...mockRequestData,
      entryDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      categories: [],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await updateJournalEntry('1', mockRequestData);

    expect(fetchMock).toHaveBeenCalledWith('/api/journal/1', expect.objectContaining({
      method: 'PUT',
      body: JSON.stringify(mockRequestData),
    }));
    expect(result).toEqual(mockResponse);
  });

  it('should delete a journal entry (deleteJournalEntry)', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => {},
    });

    await deleteJournalEntry('1');

    expect(fetchMock).toHaveBeenCalledWith('/api/journal/1', expect.objectContaining({
      method: 'DELETE',
    }));
  });

  it('should search journal entries (searchJournalEntries)', async () => {
    const fixedDate = new Date('2025-03-26T22:09:42.412Z');
    const mockResponse = {
      entries: [
        { id: '1', title: 'Search Result 1', content: 'Search content', entryDate: fixedDate, createdAt: fixedDate, categories: [] },
      ],
      pagination: { total: 1, page: 1, limit: 10, pages: 1 },
    };
  
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
  
    const result = await searchJournalEntries('Search', ['l'], fixedDate, fixedDate, 1, 10);
  
    const expectedUrl = '/api/journal/search?q=Search&categories=l&startDate=' + fixedDate.toISOString() + '&endDate=' + fixedDate.toISOString() + '&page=1&limit=10';
    const actualUrl = decodeURIComponent(fetchMock.mock.calls[0][0]);
  
    expect(actualUrl).toEqual(expectedUrl);
    expect(result).toEqual(mockResponse);
  });

  
});
