import { trpc } from "../utils/trpc"
import { lineChartResult } from "../tests/mocks/ParserForChartsMocks"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts"

export default function AnalysisPage() {
  const { data, isLoading, error } = trpc.useQuery(["spinlyzer.get-statistics"])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <div>
      <div>This is the analysis page</div>
      <>
        <LineChart
          width={600}
          height={400}
          data={data?.profitByResults}
          margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
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
          ></XAxis>
        </LineChart>
      </>
    </div>
  )
}
