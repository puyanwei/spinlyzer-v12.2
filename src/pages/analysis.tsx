import { trpc } from "../utils/trpc"
import { Statistics } from "../types"

export default function AnalysisPage() {
  const { data } = trpc.useQuery(["spinlyzer.get-statistics"])
  return <div>This is the analysis page</div>
}
