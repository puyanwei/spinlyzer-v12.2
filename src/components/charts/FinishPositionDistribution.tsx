import { VictoryPie, VictoryTheme } from "victory"
import { trpc } from "../../utils/trpc"

export function FinishPositionDistribution() {
  const { data, isLoading, error } = trpc.useQuery([
    "spinlyzer.get-finish-positions",
  ])
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data</div>

  const { finishPositionByNumber } = data
  return (
    <svg width={400} height={400}>
      <VictoryPie
        data={finishPositionByNumber}
        theme={VictoryTheme.material}
        labels={({ datum }) => datum.z}
        standalone={false}
        style={{
          labels: { fontSize: 12, fill: "white" },
        }}
      />
      <VictoryPie
        data={finishPositionByNumber}
        theme={VictoryTheme.material}
        animate
        colorScale={["orange", "pink", "navy"]}
        labelRadius={15}
        standalone={false}
        style={{
          labels: { fontSize: 12, fill: "black" },
        }}
        labels={({ datum }) => [datum.x, datum.y]}
      />
    </svg>
  )
}
