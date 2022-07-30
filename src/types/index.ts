import { ReactNode } from "react"

export interface Component {
  className?: string
  style?: string
  children?: ReactNode
  testId?: string
}
