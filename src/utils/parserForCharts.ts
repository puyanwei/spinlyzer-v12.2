export interface PrizePoolResults {
  prizePool: number
  result: string
  totalBuyIn: number
}
export interface ProfitByResults {
  x: number
  y: number
}
interface ResolvedPieChartData {
  x: "1st" | "2nd" | "3rd"
  y: number
  z: string
}

export function resolveForLineChart(
  data: PrizePoolResults[]
): ProfitByResults[] {
  const result = data?.reduce((array, current, index) => {
    const { result, prizePool, totalBuyIn } = current
    const previousProfit = array[index - 1]?.y || 0

    const updatedArray =
      result === "1st"
        ? [
            ...array,
            {
              x: index,
              y: previousProfit + (prizePool - totalBuyIn),
            },
          ]
        : [
            ...array,
            {
              x: index,
              y: previousProfit - totalBuyIn,
            },
          ]
    return updatedArray
  }, [] as ProfitByResults[])
  return result
}

export function resolveForPieChart(
  data: Record<string, number>
): ResolvedPieChartData[] {
  const totalGames = Object.values(data).reduce((acc, curr) => acc + curr, 0)
  let finishPositionByNumber: ResolvedPieChartData[] = []

  Object.entries(data).forEach(([key, value]) => {
    const percentage = (value / totalGames) * 100
    finishPositionByNumber.push({
      x: key,
      y: value,
      z: `${percentage.toFixed(1)}%`,
    } as ResolvedPieChartData)
  })

  return finishPositionByNumber
}
