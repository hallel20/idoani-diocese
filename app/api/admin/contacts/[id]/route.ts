import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';
import { requireAuth } from '@/lib/auth-middleware';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAuthed = await requireAuth();
  if (!isAuthed) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await storage.deleteContact(params.id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return Response.json({ message: "Failed to delete contact" }, { status: 500 });
  }
}
