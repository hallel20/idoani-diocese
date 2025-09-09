// pages/api/admin/contacts/[id]/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/shared/storage';
import { requireAuth } from '@/lib/auth-middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isAuthed = await requireAuth(req, res);
  if (!isAuthed) return;

  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await storage.deleteContact(id as string);
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ message: "Failed to delete contact" });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}