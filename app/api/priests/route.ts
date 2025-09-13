import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const parishId = searchParams.get('parishId');
    const priests = await storage.getPriests(
      search || undefined,
      parishId || undefined
    );
    return Response.json(priests);
  } catch (error) {
    console.error("Error fetching priests:", error);
    return Response.json({ message: "Failed to fetch priests" }, { status: 500 });
  }
}
