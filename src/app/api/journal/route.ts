import { NextRequest, NextResponse } from 'next/server';
import { getJournalEntries, createJournalEntry } from '@/services/journal.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const response = await getJournalEntries(page, limit);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch journal entries' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
  
      const newEntry = await createJournalEntry(body);
  
      return NextResponse.json(newEntry, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: error.message || 'Failed to create journal entry' }, { status: 500 });
    }
  }