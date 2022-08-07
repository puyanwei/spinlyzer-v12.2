export interface PrizePoolResults {
  prizePool: number
  result: string
  totalBuyIn: number
}

export interface ProfitByResults {
  x: number
  y: number
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
