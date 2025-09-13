import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';
import { insertParishSchema } from '@/lib/validation';
import { requireAuth } from '@/lib/auth-middleware';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  const isAuthed = await requireAuth();
  if (!isAuthed) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = insertParishSchema.parse(body);
    const parish = await storage.createParish(validatedData);
    return Response.json(parish, { status: 201 });
  } catch (error) {
    console.error("Error creating parish:", error);
    if (error instanceof z.ZodError) {
      return Response.json({ 
        message: "Invalid parish data", 
        errors: error.errors 
      }, { status: 400 });
    }
    return Response.json({ message: "Failed to create parish" }, { status: 500 });
  }
}
