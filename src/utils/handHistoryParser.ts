import { findCountries, findWord } from "./helpers"

interface Statistics {
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
}

export function handHistoryParser(data: string): Statistics {
  const preparedHandHistory = putIntoArrayAndRemoveNewLines(data)
  const tournamentNumber = getTournamentNumber(preparedHandHistory)
  const buyIn = getBuyIn(preparedHandHistory)
  const rake = getRake(preparedHandHistory)
  const totalBuyIn = getTotalBuyIn(preparedHandHistory)
  const numberOfPlayers = getNumberOfPlayers(preparedHandHistory)
  const prizePool = getPrizepool(preparedHandHistory)
  const currency = getCurrency(preparedHandHistory)
  const dateStartedEasternTime = getDateStartedEasternTime(preparedHandHistory)
  const firstPlace = getFirstPlace(preparedHandHistory)
  const secondPlace = getSecondPlace(preparedHandHistory)
  const thirdPlace = getThirdPlace(preparedHandHistory)
  const firstPlaceCountry = getFirstPlaceCountry(data)
  const secondPlaceCountry = getSecondPlaceCountry(data)
  const thirdPlaceCountry = getThirdPlaceCountry(data)
  const statistics: Statistics = {
    tournamentNumber,
    rake,
    buyIn,
    totalBuyIn,
    numberOfPlayers,
    prizePool,
    currency,
    dateStartedEasternTime,
    firstPlace,
    secondPlace,
    thirdPlace,
    firstPlaceCountry,
    secondPlaceCountry,
    thirdPlaceCountry,
  }
  return statistics
}

export function putIntoArrayAndRemoveNewLines(data: string): string[] {
  if (!data || data === "") throw new Error(`No data found`)
  const newLineTagsRemoved = data.replace(/(\r\n|\n|\r)/gm, "")
  const arrayOfWords = newLineTagsRemoved.split(" ")
  return arrayOfWords
}

export function getTournamentNumber(data: string[]): number {
  const arrayOfHashedWords = data.find(word => word.startsWith("#"))
  if (!arrayOfHashedWords) throw new Error(`Did not find # in data`)
  const tournamentNumber = arrayOfHashedWords?.substring(1) as string
  return parseInt(tournamentNumber)
}

export function getTotalBuyIn(data: string[]): number {
  if (!getRake(data)) throw new Error(`No rake data found`)
  if (!getBuyIn(data)) throw new Error(`No buy in data found`)
  const totalBuyIn = getRake(data)! + getBuyIn(data)!
  return totalBuyIn
}

export function getRake(data: string[]): number {
  if (!Array.isArray(resolveTotalBuyIn(data)))
    throw new Error(`Data is not an array`)
  if (!resolveTotalBuyIn(data))
    throw new Error(
      `Did not resolve the total buy via getRake() in data correctly`
    )
  const rake = resolveTotalBuyIn(data)?.[1] as number
  return rake
}

export function getBuyIn(data: string[]): number {
  if (!Array.isArray(resolveTotalBuyIn(data)))
    throw new Error(`Data is not an array`)
  if (!resolveTotalBuyIn(data))
    throw new Error(
      `Did not resolve the total buy via getBuyin() in data correctly`
    )
  const rake = resolveTotalBuyIn(data)?.[0] as number
  return rake
}

export function resolveTotalBuyIn(data: string[]): number[] {
  const word = findWord(data, `Hold'emBuy-In:`, 1)
  const hasForwardSlash = word?.includes("/")
  if (!hasForwardSlash) throw new Error(`Did not find a slash to split`)
  const buyInAndRakeTuple = word?.split("/")

  if (buyInAndRakeTuple?.length !== 2)
    throw new Error(`Split array does not have 2 elements`)

  const removedDollarSymbolTuple = buyInAndRakeTuple?.map(price =>
    price.startsWith("$") ? price.substring(1) : price
  )
  const parsedToNumbersTuple = removedDollarSymbolTuple.map(price =>
    parseFloat(price)
  )

  if (parsedToNumbersTuple.some(price => Number.isNaN(price)))
    throw new Error(
      `Unable to parse split elements, it is likely one or more elements are not numbers`
    )

  if (!parsedToNumbersTuple || !parsedToNumbersTuple.length)
    throw new Error(`Tuple is falsey or empty`)

  return parsedToNumbersTuple
}

export function getNumberOfPlayers(data: string[]): number {
  const word = findWord(data, "playersTotal", -1)
  const hasUSD = word?.includes("USD")
  if (!hasUSD) throw new Error(`USD word not found`)
  const numberOfPlayers = word?.split("USD")
  if (numberOfPlayers?.length !== 2)
    throw new Error(`Array split did not have 2 elements`)

  const finalNumberOfPlayers = parseInt(numberOfPlayers[1]!)
  if (Number.isNaN(finalNumberOfPlayers))
    throw new Error(`Number of players is not a number`)

  return finalNumberOfPlayers
}

export function getPrizepool(data: string[]): number {
  const word = findWord(data, `Pool:`, 1)
  if (!word?.startsWith("$")) throw new Error(`Did not find a dollar sign`)
  const prizepool = parseFloat(word?.substring(1))
  if (Number.isNaN(prizepool)) throw new Error(`Prizepool is not a number`)
  return prizepool
}

export function getCurrency(data: string[]): string {
  const word = findWord(data, `Pool:`, 2)
  if (!word?.includes("USD")) throw new Error(`Did not find USD`)
  return word
}

export function getDateStartedEasternTime(data: string[]): string {
  const date = findWord(data, `started`, 4)
  const time = findWord(data, `started`, 5)
  if (findWord(data, `started`, 6) !== "ET]") throw new Error(`Did not find ET`)
  if (!date?.startsWith("[")) throw new Error(`Did not find [`)
  const resolvedDate = date.substring(1)
  const dateAndTime = `${resolvedDate} ${time}`
  return dateAndTime
}

export function getFirstPlace(data: string[]): string {
  const word = findWord(data, `1:`, 1)
  return word
}
export function getSecondPlace(data: string[]): string {
  const word = findWord(data, `2:`, 1)
  return word
}
export function getThirdPlace(data: string[]): string {
  const word = findWord(data, `3:`, 1)
  return word
}

export function getFirstPlaceCountry(data: string): string {
  const countries = findCountries(data)
  if (!countries?.length)
    throw new Error("Did not find any first place countries")
  return countries[0]!
}
export function getSecondPlaceCountry(data: string): string {
  const countries = findCountries(data)
  if (!countries?.length)
    throw new Error("Did not find any second place countries")
  return countries[1]!
}
export function getThirdPlaceCountry(data: string): string {
  const countries = findCountries(data)
  if (!countries?.length)
    throw new Error("Did not find any third place countries")
  return countries[2]!
}
