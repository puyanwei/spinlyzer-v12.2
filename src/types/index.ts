import { ReactNode } from "react"

export interface Component {
  className?: string
  style?: string
  children?: ReactNode
  testId?: string
}

export interface Statistics {
  tournamentNumber: number
  buyIn: number
  rake: number
  totalBuyIn: number
  numberOfPlayers: number
  prizePool: number
  currency: string
  dateStartedEasternTime: string
  firstPlace: string
  secondPlace: string
  thirdPlace: string
  firstPlaceCountry: string
  secondPlaceCountry: string
  thirdPlaceCountry: string
  result: string
}
