import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';
import { insertPriestSchema } from '@/lib/validation';
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
    const validatedData = insertPriestSchema.partial().parse(body);
    const priest = await storage.updatePriest(params.id, validatedData);
    return Response.json(priest);
  } catch (error) {
    console.error("Error updating priest:", error);
    if (error instanceof z.ZodError) {
      return Response.json({ 
        message: "Invalid priest data", 
        errors: error.errors 
      }, { status: 400 });
    }
    return Response.json({ message: "Failed to update priest" }, { status: 500 });
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
    await storage.deletePriest(params.id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting priest:", error);
    return Response.json({ message: "Failed to delete priest" }, { status: 500 });
  }
}
