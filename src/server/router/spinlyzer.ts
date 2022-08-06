import { createRouter } from "./context"
import { z } from "zod"
import { prisma } from "../db/client"
import { handHistoryParser } from "../../utils/handHistoryParser"
import {
  PrizePoolResults,
  resolveForLineChart,
} from "../../utils/parserForCharts"

export const spinlyzerRouter = createRouter()
  .mutation("add", {
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
  .query("get-statistics", {
    async resolve({ ctx }) {
      const profitDashboard = (await ctx.prisma.statistics.findMany({
        select: {
          prizePool: true,
          result: true,
          totalBuyIn: true,
        },
      })) as PrizePoolResults[]
      const profitByResults = await resolveForLineChart(profitDashboard)
      return { success: true, profitByResults }
    },
  })
