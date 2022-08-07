import { FinishPositionDistribution } from "../components/charts/FinishPositionDistribution"
import { ProfitByNumberOfGames } from "../components/charts/ProfitByNumberOfGames"

export default function AnalysisPage() {
  return (
    <div className="p-4">
      <h1>Analysis</h1>
      {/* <ProfitByNumberOfGames /> */}
      <FinishPositionDistribution />
    </div>
  )
}
