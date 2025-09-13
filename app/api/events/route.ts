import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const events = await storage.getEvents(limit ? parseInt(limit) : undefined);
    return Response.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return Response.json({ message: "Failed to fetch events" }, { status: 500 });
  }
}
