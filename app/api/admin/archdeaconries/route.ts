// app/api/admin/archdeaconries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/shared/storage';
import { insertArchdeaconrySchema } from '@/lib/validation';
import { requireAuth } from '@/lib/auth-middleware';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  const isAuthed = await requireAuth();
  if (!isAuthed) {
    return new Response(null, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = insertArchdeaconrySchema.parse(body);
    const archdeaconry = await storage.createArchdeaconry(validatedData);
    return NextResponse.json(archdeaconry, { status: 201 });
  } catch (error) {
    console.error("Error creating archdeaconry:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        message: "Invalid archdeaconry data",
        errors: error.errors
      }, { status: 400 });
    }
    return NextResponse.json({ message: "Failed to create archdeaconry" }, { status: 500 });
  }
}