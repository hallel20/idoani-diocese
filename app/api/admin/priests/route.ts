import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';
import { insertPriestSchema } from '@/lib/validation';
import { requireAuth } from '@/lib/auth-middleware';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  const isAuthed = await requireAuth();
  if (!isAuthed) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = insertPriestSchema.parse(body);
    const priest = await storage.createPriest(validatedData);
    return Response.json(priest, { status: 201 });
  } catch (error) {
    console.error("Error creating priest:", error);
    if (error instanceof z.ZodError) {
      return Response.json({ 
        message: "Invalid priest data", 
        errors: error.errors 
      }, { status: 400 });
    }
    return Response.json({ message: "Failed to create priest" }, { status: 500 });
  }
}
