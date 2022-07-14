import { createRouter } from './context';
import { z } from 'zod';
import { prisma } from '../db/client';

export const exampleRouter = createRouter()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .query('getAll', {
    async resolve() {
      return await prisma.example.findMany();
    },
  })
  .mutation('create', {
    input: z.object({
      firstName: z.string(),
      surname: z.string(),
    }),
    async resolve({ input }) {
      const egg = await prisma.example.create({
        data: {
          firstName: input.firstName,
          surname: input.surname,
        },
      });
      return egg;
    },
  });
