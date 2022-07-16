import { prisma } from '../../server/db/client';

export default async function handler(req, res) {
  const egg = await prisma.example.findMany();
  console.log('egg', egg);
  res.status(200).json(egg);
}
