import { createRouter } from "./context"
import { z } from "zod"
import { prisma } from "../db/client"
import { handHistoryParser } from "../../utils/handHistoryParser"

export const spinlyzerRouter = createRouter().mutation("add", {
  input: z.string(),
  async resolve({ input }) {
    try {
      const statistics = await handHistoryParser(input)
      const result = await prisma.statistics.create({
        data: {
          ...statistics,
        },
      })
      return { success: true, data: result }
    } catch (error) {
      console.warn(error)
      return { success: false, error }
    }
  },
})
