import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';

export async function GET() {
  try {
    const archdeaconries = await storage.getArchdeaconries();
    return Response.json(archdeaconries);
  } catch (error) {
    console.error("Error fetching archdeaconries:", error);
    return Response.json({ message: "Failed to fetch archdeaconries" }, { status: 500 });
  }
}
