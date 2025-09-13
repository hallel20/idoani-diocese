import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';
import { requireAuth } from '@/lib/auth-middleware';

export async function GET() {
  const isAuthed = await requireAuth();
  if (!isAuthed) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const contacts = await storage.getContacts();
    return Response.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return Response.json({ message: "Failed to fetch contacts" }, { status: 500 });
  }
}
