// lib/auth-middleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../auth'; 

export async function requireAuth(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth();
  
  if (!session) {
    res.status(401).json({ message: "Authentication required" });
    return false;
  }
  
  return true;
}