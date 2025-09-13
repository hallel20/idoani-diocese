import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const archdeaconryId = searchParams.get('archdeaconryId');
    const parishes = await storage.getParishes(
      search || undefined,
      archdeaconryId || undefined
    );
    return Response.json(parishes);
  } catch (error) {
    console.error("Error fetching parishes:", error);
    return Response.json({ message: "Failed to fetch parishes" }, { status: 500 });
  }
}
