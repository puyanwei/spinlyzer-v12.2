import { PieChart, Pie, Cell, XAxis, Label, Tooltip } from "recharts"
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
  // const { data, isLoading, error } = trpc.useQuery([
  //   "spinlyzer.get-finish-positions",
  // ])
  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error: {error.message}</div>

  const mockData = [
    { name: "1st", value: 133, fill: "#8884d8" },
    { name: "2nd", value: 135, fill: "#82ca9d" },
    { name: "3rd", value: 86, fill: "#ffc658" },
  ]

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

  return (
    <PieChart width={800} height={500}>
      <Pie
        data={mockData}
        dataKey="value"
        nameKey="name"
        label={renderCustomizedLabel}
        cx={400}
        cy={300}
        outerRadius={150}
        labelLine={false}
      />
      {mockData.map((entry, index) => {
        const colors = ["#8884d8", "#82ca9d", "#ffc658"]
        return <Cell key={`cell-${index}`} fill={colors[index]} />
      })}
      <Tooltip />
    </PieChart>
  )
}
