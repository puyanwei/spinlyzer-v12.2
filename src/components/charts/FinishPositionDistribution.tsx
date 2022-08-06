import { PieChart, Pie, Cell, Tooltip } from "recharts"
import { trpc } from "../../utils/trpc"

interface RenderCustomizedLabelProps {
  cx: string
  cy: string
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  name?: string
}

export function FinishPositionDistribution() {
  const { data, isLoading, error } = trpc.useQuery([
    "spinlyzer.get-finish-positions",
  ])
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  console.log("data", data)

  function renderCustomizedLabel({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }: RenderCustomizedLabelProps) {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    return (
      <text x={x} y={y} fill="white" textAnchor={"middle"}>
        {`${name} place ${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <PieChart width={800} height={500}>
      <Pie
        data={data?.finishPositionDistribution}
        dataKey="value"
        nameKey="name"
        label={renderCustomizedLabel}
        cx={400}
        cy={300}
        outerRadius={150}
        labelLine={false}
      />
      {data?.finishPositionDistribution?.map((entry, index) => (
        <Cell fill={COLORS[index % COLORS.length]} />
      ))}
      <Tooltip />
    </PieChart>
  )
}
