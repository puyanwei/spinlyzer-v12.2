import { createRouter } from "./context"
import { z } from "zod"
import { prisma } from "../db/client"
import { handHistoryParser } from "../../utils/handHistoryParser"
import {
  PrizePoolResults,
  resolveForLineChart,
} from "../../utils/parserForCharts"
import { countHashKeys, resolveForPieChart } from "../../utils/helpers"

export const spinlyzerRouter = createRouter()
  .mutation("upload-handhistory-data", {
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
  .query("get-results-by-game", {
    async resolve({ ctx }) {
      try {
        const profitDashboard = (await ctx.prisma.statistics.findMany({
          select: {
            prizePool: true,
            result: true,
            totalBuyIn: true,
          },
        })) as PrizePoolResults[]
        const profitByResults = await resolveForLineChart(profitDashboard)
        return { success: true, profitByResults }
      } catch (error) {
        console.warn(error)
        return { success: false, error }
      }
    },
  })
  .query("get-finish-positions", {
    async resolve({ ctx }) {
      try {
        const finishPositions = await ctx.prisma.statistics.findMany({
          select: {
            result: true,
          },
        })
        const objectOfPositions = countHashKeys(
          finishPositions as Record<string, string>[],
          "result"
        )
        if (!objectOfPositions) throw new Error("No finish positions found")
        return {
          success: true,
          finishPositionDistribution: resolveForPieChart(objectOfPositions),
        }
      } catch (error) {
        return { success: false, error }
      }
    },
  })
