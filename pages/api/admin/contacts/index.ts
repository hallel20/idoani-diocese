// pages/api/admin/contacts/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/shared/storage';
import { requireAuth } from '@/lib/auth-middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isAuthed = await requireAuth(req, res);
  if (!isAuthed) return;

  if (req.method === 'GET') {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}