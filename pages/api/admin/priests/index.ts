// pages/api/admin/priests/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/shared/storage';
import { insertPriestSchema } from '@/lib/validation';
import { requireAuth } from '@/lib/auth-middleware';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isAuthed = await requireAuth(req, res);
  if (!isAuthed) return;

  if (req.method === 'POST') {
    try {
      const validatedData = insertPriestSchema.parse(req.body);
      const priest = await storage.createPriest(validatedData);
      res.status(201).json(priest);
    } catch (error) {
      console.error("Error creating priest:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid priest data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create priest" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}