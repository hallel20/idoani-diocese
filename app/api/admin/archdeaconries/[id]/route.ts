import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';
import { insertArchdeaconrySchema } from '@/lib/validation';
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
    const validatedData = insertArchdeaconrySchema.partial().parse(body);
    const archdeaconry = await storage.updateArchdeaconry(params.id, validatedData);
    return Response.json(archdeaconry);
  } catch (error) {
    console.error("Error updating archdeaconry:", error);
    if (error instanceof z.ZodError) {
      return Response.json({ 
        message: "Invalid archdeaconry data", 
        errors: error.errors 
      }, { status: 400 });
    }
    return Response.json({ message: "Failed to update archdeaconry" }, { status: 500 });
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
    await storage.deleteArchdeaconry(params.id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting archdeaconry:", error);
    return Response.json({ message: "Failed to delete archdeaconry" }, { status: 500 });
  }
}
