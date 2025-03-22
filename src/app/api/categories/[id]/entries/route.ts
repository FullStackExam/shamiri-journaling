import { NextRequest, NextResponse } from 'next/server';
import { getCategoryEntries } from '@/services/category.service';
import { getAuthUser } from '@/lib/auth/middleware';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getAuthUser(req);
    const { id } = params;

    // Fetch all entries related to the category by its ID
    const entries = await getCategoryEntries(id);

    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category entries' }, { status: 500 });
  }
}
