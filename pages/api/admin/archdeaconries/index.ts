// pages/api/admin/archdeaconries/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/shared/storage';
import { insertArchdeaconrySchema } from '@/lib/validation';
import { requireAuth } from '@/lib/auth-middleware';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isAuthed = await requireAuth(req, res);
  if (!isAuthed) return;

  if (req.method === 'POST') {
    try {
      const validatedData = insertArchdeaconrySchema.parse(req.body);
      const archdeaconry = await storage.createArchdeaconry(validatedData);
      res.status(201).json(archdeaconry);
    } catch (error) {
      console.error("Error creating archdeaconry:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid archdeaconry data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create archdeaconry" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}