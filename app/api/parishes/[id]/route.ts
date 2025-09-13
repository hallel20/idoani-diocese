import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const parish = await storage.getParish(params.id);
    if (!parish) {
      return Response.json({ message: "Parish not found" }, { status: 404 });
    }
    return Response.json(parish);
  } catch (error) {
    console.error("Error fetching parish:", error);
    return Response.json({ message: "Failed to fetch parish" }, { status: 500 });
  }
}
