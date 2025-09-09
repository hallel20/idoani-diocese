// pages/api/events/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '@/shared/storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { limit } = req.query;
      const events = await storage.getEvents(limit ? parseInt(limit as string) : undefined);
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}