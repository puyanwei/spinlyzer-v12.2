import { number } from "zod"
import { findWord, returnNullAndWarn } from "../../utils/helpers"

interface Statistics {
  tournamentNumber: number | null
  buyIn: number | null
  rake: number | null
  totalBuyIn: number | null
  numberOfPlayers: number | null
  prizePool: number | null
  currency: string | null
  dateStarted: Date | null
  timeStarted: Date | null
  timeRegion: string | null
  first: number | null
  firstCountry: string | null
  second: number | null
  secondCountry: string | null
  third: number | null
  thirdCountry: string | null
  result: string | null
}

export function handHistoryParser(data: string): Statistics {
  const preparedHandHistory = putIntoArrayAndRemoveNewLines(data)
  const tournamentNumber = getTournamentNumber(preparedHandHistory)
  const buyIn = getBuyIn(preparedHandHistory)
  const rake = getRake(preparedHandHistory)
  const totalBuyIn = getTotalBuyIn(preparedHandHistory)
  //   const numberOfPlayers = getNumberOfPlayers(preparedHandHistory)
  //   const prizePool = getPrizePool(preparedHandHistory)
  //   const currency = getCurrency(preparedHandHistory)
  //   const dateStarted = getDateStarted(preparedHandHistory)
  //   const timeStarted = getTimeStarted(preparedHandHistory)
  //   const timeRegion = getTimeRegion(preparedHandHistory)
  //   const first = getFirst(preparedHandHistory)
  //   const firstCountry = getFirstCountry(preparedHandHistory)
  //   const second = getSecond(preparedHandHistory)
  //   const secondCountry = getSecondCountry(preparedHandHistory)
  //   const third = getThird(preparedHandHistory)
  //   const thirdCountry = getThirdCountry(preparedHandHistory)
  //   const result = getResult(preparedHandHistory)

  return {
    tournamentNumber,
    rake,
    buyIn,
    totalBuyIn,
    numberOfPlayers,
    //     prizePool,
    //     currency,
    //     dateStarted,
    //     timeStarted,
    //     timeRegion,
    //     first,
    //     firstCountry,
    //     second,
    //     secondCountry,
    //     third,
    //     thirdCountry,
    //     result,
  }
}

export function putIntoArrayAndRemoveNewLines(data: string): string[] {
  if (!data || data === "") throw new Error(`No data found`)
  const newLineTagsRemoved = data.replace(/(\r\n|\n|\r)/gm, "")
  const arrayOfWords = newLineTagsRemoved.split(" ")
  return arrayOfWords
}

export function getTournamentNumber(data: string[]): number | null {
  const arrayOfHashedWords = data.find((word) => word.startsWith("#"))
  if (!arrayOfHashedWords)
    return returnNullAndWarn("No words starting with hashtags found")
  const tournamentNumber = arrayOfHashedWords?.substring(1) as string
  return parseInt(tournamentNumber)
}

export function getTotalBuyIn(data: string[]): number | null {
  if (!getRake(data)) return returnNullAndWarn(`rake parsing error`)
  if (!getBuyIn(data)) return returnNullAndWarn(`buy in parsing error`)
  const totalBuyIn = getRake(data)! + getBuyIn(data)!
  return totalBuyIn
}

export function getRake(data: string[]): number | null {
  if (!Array.isArray(resolveTotalBuyIn(data))) return null
  if (!resolveTotalBuyIn(data)) return null
  const rake = resolveTotalBuyIn(data)?.[1] as number
  return rake
}

export function getBuyIn(data: string[]): number | null {
  if (!Array.isArray(resolveTotalBuyIn(data))) return null
  if (!resolveTotalBuyIn(data)) return null
  const rake = resolveTotalBuyIn(data)?.[0] as number
  return rake
}

export function resolveTotalBuyIn(data: string[]): number[] | null {
  const word = findWord(data, `Hold'emBuy-In:`, 1)
  const hasForwardSlash = word?.includes("/")
  if (!hasForwardSlash) return returnNullAndWarn(`has no slash to split`)
  const buyInAndRakeTuple = word?.split("/")

  if (buyInAndRakeTuple?.length !== 2)
    return returnNullAndWarn(`split array does not have 2 elements`)

  const removedDollarSymbolTuple = buyInAndRakeTuple?.map((price) =>
    price.startsWith("$") ? price.substring(1) : price,
  )
  const parsedToNumbersTuple = removedDollarSymbolTuple.map((price) =>
    parseFloat(price),
  )

  if (parsedToNumbersTuple.some((price) => Number.isNaN(price)))
    return returnNullAndWarn(`unable to parse split elements`)

  if (!parsedToNumbersTuple || !parsedToNumbersTuple.length)
    return returnNullAndWarn(`Tuple is falsey`)

  return parsedToNumbersTuple
}

export function getNumberOfPlayers(data: string[]): number | null {
  const word = findWord(data, "playersTotal", -1)
  const hasUSD = word?.includes("USD")
  if (!hasUSD)
    return returnNullAndWarn(
      `does not have USD word to use to find number of players`,
    )
  const numberOfPlayers = word?.split("USD")
  if (numberOfPlayers?.length !== 2)
    return returnNullAndWarn(`split array does not have 2 elements`)

  const finalNumberOfPlayers = parseInt(numberOfPlayers[1]!)
  if (Number.isNaN(finalNumberOfPlayers))
    return returnNullAndWarn(`parsed string did not resolve to a number`)

  return finalNumberOfPlayers
}
