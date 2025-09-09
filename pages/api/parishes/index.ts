// pages/api/parishes/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/shared/storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { search, archdeaconryId } = req.query;
      const parishes = await storage.getParishes(
        search as string,
        archdeaconryId as string
      );
      res.json(parishes);
    } catch (error) {
      console.error("Error fetching parishes:", error);
      res.status(500).json({ message: "Failed to fetch parishes" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}