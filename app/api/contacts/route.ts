import { NextRequest } from 'next/server';
import { storage } from '@/shared/storage';
import { insertContactSchema } from '@/lib/validation';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertContactSchema.parse(body);
    const contact = await storage.createContact(validatedData);
    return Response.json(contact, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    if (error instanceof z.ZodError) {
      return Response.json({ 
        message: "Invalid contact data", 
        errors: error.errors 
      }, { status: 400 });
    }
    return Response.json({ message: "Failed to create contact" }, { status: 500 });
  }
}
