import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';
import { requireAuth } from '@/lib/auth-middleware';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAuthed = await requireAuth();
  if (!isAuthed) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await storage.markContactAsRead(params.id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error marking contact as read:", error);
    return Response.json({ message: "Failed to mark contact as read" }, { status: 500 });
  }
}
