// pages/api/admin/parishes/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/shared/storage';
import { insertParishSchema } from '@/lib/validation';
import { requireAuth } from '@/lib/auth-middleware';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isAuthed = await requireAuth(req, res);
  if (!isAuthed) return;

  if (req.method === 'POST') {
    try {
      const validatedData = insertParishSchema.parse(req.body);
      const parish = await storage.createParish(validatedData);
      res.status(201).json(parish);
    } catch (error) {
      console.error("Error creating parish:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid parish data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create parish" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}