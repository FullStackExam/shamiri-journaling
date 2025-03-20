
import { NextRequest, NextResponse } from 'next/server';
import { getJournalEntryById, updateJournalEntry, deleteJournalEntry } from '@/services/journal.service';

export async function GET(req: NextRequest) {
  try {
    const { id } = req.params;

    const entry = await getJournalEntryById(id);

    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch journal entry' }, { status: 500 });
  }
}



export async function PUT(req: NextRequest) {
  try {
    const { id } = req.params;
    const body = await req.json();

    const updatedEntry = await updateJournalEntry(id, body);

    return NextResponse.json(updatedEntry);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to update journal entry' }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest) {
  try {
    const { id } = req.params;

    await deleteJournalEntry(id);

    return NextResponse.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to delete journal entry' }, { status: 500 });
  }
}