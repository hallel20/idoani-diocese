// pages/api/archdeaconries/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/shared/storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const archdeaconries = await storage.getArchdeaconries();
      res.json(archdeaconries);
    } catch (error) {
      console.error("Error fetching archdeaconries:", error);
      res.status(500).json({ message: "Failed to fetch archdeaconries" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}