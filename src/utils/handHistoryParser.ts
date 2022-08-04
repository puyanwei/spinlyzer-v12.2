import { findCountries, findWord, returnNullAndWarn } from "./helpers"

interface Statistics {
  tournamentNumber: number | null
  buyIn: number | null
  rake: number | null
  totalBuyIn: number | null
  numberOfPlayers: number | null
  prizePool: number | null
  currency: string | null
  dateStartedEasternTime: string | null
  firstPlace: string | null
  secondPlace: string | null
  thirdPlace: string | null
  firstPlaceCountry: string | null
  secondPlaceCountry: string | null
  thirdPlaceCountry: string | null
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

export function getTournamentNumber(data: string[]): number | null {
  const arrayOfHashedWords = data.find(word => word.startsWith("#"))
  if (!arrayOfHashedWords)
    return returnNullAndWarn("No words starting with hashtags found", data)
  const tournamentNumber = arrayOfHashedWords?.substring(1) as string
  return parseInt(tournamentNumber)
}

export function getTotalBuyIn(data: string[]): number | null {
  if (!getRake(data)) return returnNullAndWarn(`rake parsing error`, data)
  if (!getBuyIn(data)) return returnNullAndWarn(`buy in parsing error`, data)
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
  if (!hasForwardSlash) return returnNullAndWarn(`has no slash to split`, data)
  const buyInAndRakeTuple = word?.split("/")

  if (buyInAndRakeTuple?.length !== 2)
    return returnNullAndWarn(`split array does not have 2 elements`, data)

  const removedDollarSymbolTuple = buyInAndRakeTuple?.map(price =>
    price.startsWith("$") ? price.substring(1) : price
  )
  const parsedToNumbersTuple = removedDollarSymbolTuple.map(price =>
    parseFloat(price)
  )

  if (parsedToNumbersTuple.some(price => Number.isNaN(price)))
    return returnNullAndWarn(`unable to parse split elements`, data)

  if (!parsedToNumbersTuple || !parsedToNumbersTuple.length)
    return returnNullAndWarn(`Tuple is falsey`, data)

  return parsedToNumbersTuple
}

export function getNumberOfPlayers(data: string[]): number | null {
  const word = findWord(data, "playersTotal", -1)
  const hasUSD = word?.includes("USD")
  if (!hasUSD)
    return returnNullAndWarn(
      `does not have USD word to use to find number of players`,
      data
    )
  const numberOfPlayers = word?.split("USD")
  if (numberOfPlayers?.length !== 2)
    return returnNullAndWarn(`split array does not have 2 elements`, data)

  const finalNumberOfPlayers = parseInt(numberOfPlayers[1]!)
  if (Number.isNaN(finalNumberOfPlayers))
    return returnNullAndWarn(`parsed string did not resolve to a number`, data)

  return finalNumberOfPlayers
}

export function getPrizepool(data: string[]): number | null {
  const word = findWord(data, `Pool:`, 1)
  if (!word?.startsWith("$"))
    return returnNullAndWarn(`word does not have $ sign`, data)
  const prizepool = parseFloat(word?.substring(1))
  if (Number.isNaN(prizepool))
    return returnNullAndWarn(`unable to parse from string to number`, data)
  return prizepool
}

export function getCurrency(data: string[]): string | null {
  const word = findWord(data, `Pool:`, 2)
  if (!word?.includes("USD"))
    return returnNullAndWarn(`does not find a currency`, data)
  return word
}

export function getDateStartedEasternTime(data: string[]): string | null {
  const date = findWord(data, `started`, 4)
  const time = findWord(data, `started`, 5)
  if (findWord(data, `started`, 6) !== "ET]")
    return returnNullAndWarn(`array string with ET not found`, data)
  if (!date?.startsWith("["))
    return returnNullAndWarn(`word does not have [ sign`, data)
  const resolvedDate = date.substring(1)
  const dateAndTime = `${resolvedDate} ${time}`
  return dateAndTime
}

export function getFirstPlace(data: string[]): string | null {
  const word = findWord(data, `1:`, 1)
  return word
}
export function getSecondPlace(data: string[]): string | null {
  const word = findWord(data, `2:`, 1)
  return word
}
export function getThirdPlace(data: string[]): string | null {
  const word = findWord(data, `3:`, 1)
  return word
}

export function getFirstPlaceCountry(data: string): string | null {
  const countries = findCountries(data)
  if (!countries?.length) return returnNullAndWarn(`country parsing failed`)
  return countries[0]!
}
export function getSecondPlaceCountry(data: string): string | null {
  const countries = findCountries(data)
  if (!countries?.length) return returnNullAndWarn(`country parsing failed`)
  return countries[1]!
}
export function getThirdPlaceCountry(data: string): string | null {
  const countries = findCountries(data)
  if (!countries?.length) return returnNullAndWarn(`country parsing failed`)
  return countries[2]!
}
