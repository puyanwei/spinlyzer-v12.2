import { NextApiRequest, NextApiResponse } from 'next/types';
import { prisma } from '../../server/db/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const egg = await prisma.example.findMany();
  console.log('egg', egg);
  res.status(200).json(egg);
}
