import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';
import { insertEventSchema } from '@/lib/validation';
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
    // Convert string date to Date object if needed
    const data = { ...body };
    if (data.date && typeof data.date === 'string') {
      data.date = new Date(data.date);
    }
    
    const validatedData = insertEventSchema.partial().parse(data);
    const event = await storage.updateEvent(params.id, validatedData);
    return Response.json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    if (error instanceof z.ZodError) {
      return Response.json({ 
        message: "Invalid event data", 
        errors: error.errors 
      }, { status: 400 });
    }
    return Response.json({ message: "Failed to update event" }, { status: 500 });
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
    await storage.deleteEvent(params.id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting event:", error);
    return Response.json({ message: "Failed to delete event" }, { status: 500 });
  }
}
