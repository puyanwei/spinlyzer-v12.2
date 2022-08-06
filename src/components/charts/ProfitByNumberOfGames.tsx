import React from "react"
import { trpc } from "../../utils/trpc"
import { LineChart, Line, CartesianGrid, Tooltip, YAxis, XAxis } from "recharts"

export function ProfitByNumberOfGames() {
  const { data, isLoading, error } = trpc.useQuery([
    "spinlyzer.get-results-by-game",
  ])
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <LineChart
      width={600}
      height={400}
      data={data?.profitByResults}
      margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
    >
      <Line dot={false} type="monotone" dataKey="profit" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <Tooltip />
      <YAxis
        dataKey="profit"
        label={{
          value: "Profit",
          angle: -90,
          position: "insideLeft",
          fill: "#fff",
          offset: -10,
        }}
      />
      <XAxis
        dataKey="gameNumber"
        label={{
          value: "Number of games",
          offset: -10,
          position: "insideBottom",
          fill: "#fff",
        }}
      />
    </LineChart>
  )
}
