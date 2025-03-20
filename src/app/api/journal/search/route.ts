// File: app/api/journal/search/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { searchJournalEntries } from  from '@/services/journal.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const query = searchParams.get('q') || '';
    const categories = searchParams.get('categories')?.split(',') || [];
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')) : undefined;
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')) : undefined;
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const response = await searchJournalEntries(query, categories, startDate, endDate, page, limit);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to search journal entries' }, { status: 500 });
  }
}
