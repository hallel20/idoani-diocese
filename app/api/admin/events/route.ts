import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';
import { insertEventSchema } from '@/lib/validation';
import { requireAuth } from '@/lib/auth-middleware';
import { z } from 'zod';

export async function POST(request: NextRequest) {
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
    
    const validatedData = insertEventSchema.parse(data);
    const event = await storage.createEvent(validatedData);
    return Response.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    if (error instanceof z.ZodError) {
      return Response.json({ 
        message: "Invalid event data", 
        errors: error.errors 
      }, { status: 400 });
    }
    return Response.json({ message: "Failed to create event" }, { status: 500 });
  }
}
