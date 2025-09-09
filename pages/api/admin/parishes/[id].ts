// pages/api/admin/parishes/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/shared/storage';
import { insertParishSchema } from '@/lib/validation';
import { requireAuth } from '@/lib/auth-middleware';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isAuthed = await requireAuth(req, res);
  if (!isAuthed) return;

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const validatedData = insertParishSchema.partial().parse(req.body);
      const parish = await storage.updateParish(id as string, validatedData);
      res.json(parish);
    } catch (error) {
      console.error("Error updating parish:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid parish data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to update parish" });
    }
  } else if (req.method === 'DELETE') {
    try {
      await storage.deleteParish(id as string);
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting parish:", error);
      res.status(500).json({ message: "Failed to delete parish" });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}