// pages/api/admin/priests/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/shared/storage';
import { insertPriestSchema } from '@/lib/validation';
import { requireAuth } from '@/lib/auth-middleware';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isAuthed = await requireAuth(req, res);
  if (!isAuthed) return;

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const validatedData = insertPriestSchema.partial().parse(req.body);
      const priest = await storage.updatePriest(id as string, validatedData);
      res.json(priest);
    } catch (error) {
      console.error("Error updating priest:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid priest data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to update priest" });
    }
  } else if (req.method === 'DELETE') {
    try {
      await storage.deletePriest(id as string);
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting priest:", error);
      res.status(500).json({ message: "Failed to delete priest" });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}