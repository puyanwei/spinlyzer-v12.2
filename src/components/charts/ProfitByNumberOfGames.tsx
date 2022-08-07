import React from "react"
import { trpc } from "../../utils/trpc"
import { VictoryChart, VictoryLine, VictoryTheme } from "victory"

export function ProfitByNumberOfGames() {
  const { data, isLoading, error } = trpc.useQuery([
    "spinlyzer.get-results-by-game",
  ])
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data</div>
  const { profitByResults } = data
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc" },
        }}
        data={profitByResults}
        animate
      />
    </VictoryChart>
  )
}
