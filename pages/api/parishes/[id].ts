// pages/api/parishes/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/shared/storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const parish = await storage.getParish(id as string);
      if (!parish) {
        return res.status(404).json({ message: "Parish not found" });
      }
      res.json(parish);
    } catch (error) {
      console.error("Error fetching parish:", error);
      res.status(500).json({ message: "Failed to fetch parish" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}