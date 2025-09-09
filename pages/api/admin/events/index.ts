// pages/api/admin/events/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/shared/storage';
import { insertEventSchema } from '@/lib/validation';
import { requireAuth } from '@/lib/auth-middleware';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isAuthed = await requireAuth(req, res);
  if (!isAuthed) return;

  if (req.method === 'POST') {
    try {
      // Convert string date to Date object if needed
      const data = { ...req.body };
      if (data.date && typeof data.date === 'string') {
        data.date = new Date(data.date);
      }
      
      const validatedData = insertEventSchema.parse(data);
      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid event data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create event" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}