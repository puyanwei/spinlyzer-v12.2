export interface PrizePoolResults {
  prizePool: number
  result: string
  totalBuyIn: number
}

export interface ProfitByResults {
  gameNumber: number
  profit: number
}

export function resolveForLineChart(
  data: PrizePoolResults[]
): ProfitByResults[] {
  const result = data?.reduce((array, current, index) => {
    const { result, prizePool, totalBuyIn } = current
    const previousProfit = array[index - 1]?.profit || 0

    const updatedArray =
      result === "1st"
        ? [
            ...array,
            {
              gameNumber: index,
              profit: previousProfit + (prizePool - totalBuyIn),
            },
          ]
        : [
            ...array,
            {
              gameNumber: index,
              profit: previousProfit - (prizePool - totalBuyIn),
            },
          ]
    return updatedArray
  }, [] as ProfitByResults[])
  return result
}
