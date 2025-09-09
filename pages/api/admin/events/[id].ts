// pages/api/admin/events/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/shared/storage';
import { insertEventSchema } from '@/lib/validation';
import { requireAuth } from '@/lib/auth-middleware';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isAuthed = await requireAuth(req, res);
  if (!isAuthed) return;

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      // Convert string date to Date object if needed
      const data = { ...req.body };
      if (data.date && typeof data.date === 'string') {
        data.date = new Date(data.date);
      }
      
      const validatedData = insertEventSchema.partial().parse(data);
      const event = await storage.updateEvent(id as string, validatedData);
      res.json(event);
    } catch (error) {
      console.error("Error updating event:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid event data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to update event" });
    }
  } else if (req.method === 'DELETE') {
    try {
      await storage.deleteEvent(id as string);
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ message: "Failed to delete event" });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}