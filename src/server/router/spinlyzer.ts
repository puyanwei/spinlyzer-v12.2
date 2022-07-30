import { createRouter } from "./context"
import { z } from "zod"
import { prisma } from "../db/client"

export const spinlyzerRouter = createRouter()
  .query("getAll", {
    async resolve() {
      return await prisma.example.findMany()
    },
  })
  .mutation("create", {
    input: z.object({
      firstName: z.string(),
      surname: z.string(),
    }),
    async resolve({ input }) {
      const data = await prisma.example.create({
        data: {
          firstName: input.firstName,
          surname: input.surname,
        },
      })
      return data
    },
  })
