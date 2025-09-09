// pages/api/priests/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/shared/storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { search, parishId } = req.query;
      const priests = await storage.getPriests(
        search as string,
        parishId as string
      );
      res.json(priests);
    } catch (error) {
      console.error("Error fetching priests:", error);
      res.status(500).json({ message: "Failed to fetch priests" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}