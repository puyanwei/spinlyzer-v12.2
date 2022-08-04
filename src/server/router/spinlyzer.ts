import { createRouter } from "./context"
import { z } from "zod"
import { prisma } from "../db/client"
import { handHistoryParser } from "../../utils/handHistoryParser"

export const spinlyzerRouter = createRouter().mutation("create", {
  input: z.string(),
  async resolve({ input }) {
    const data = await handHistoryParser(input)
    const result = await prisma.spinlyzer.create({
      data: {
        result,
      },
    })
    return { success: true, data: result }
  },
})
