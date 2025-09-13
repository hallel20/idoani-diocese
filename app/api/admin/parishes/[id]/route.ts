import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';
import { insertParishSchema } from '@/lib/validation';
import { requireAuth } from '@/lib/auth-middleware';
import { z } from 'zod';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAuthed = await requireAuth();
  if (!isAuthed) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = insertParishSchema.partial().parse(body);
    const parish = await storage.updateParish(params.id, validatedData);
    return Response.json(parish);
  } catch (error) {
    console.error("Error updating parish:", error);
    if (error instanceof z.ZodError) {
      return Response.json({ 
        message: "Invalid parish data", 
        errors: error.errors 
      }, { status: 400 });
    }
    return Response.json({ message: "Failed to update parish" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAuthed = await requireAuth();
  if (!isAuthed) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await storage.deleteParish(params.id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting parish:", error);
    return Response.json({ message: "Failed to delete parish" }, { status: 500 });
  }
}
