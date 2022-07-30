import { findWord, returnNullAndWarn } from "../../utils/helpers";

interface Statistics {
  tournamentNumber: number;
  buyIn: number;
  rake: number;
  totalBuyIn: number;
  numberOfPlayers: number;
  prizePool: number;
  currency: string;
  dateStarted: Date;
  timeStarted: Date;
  timeRegion: string;
  first: number;
  firstCountry: string;
  second: number;
  secondCountry: string;
  third: number;
  thirdCountry: string;
  result: string;
}

export function handHistoryParser(data: string): Statistics {
  const preparedHandHistory = putIntoArrayAndRemoveNewLines(data);
  const tournamentNumber = getTournamentNumber(preparedHandHistory);
  const buyIn = getBuyIn(preparedHandHistory);
  //   const rake = getRake(preparedHandHistory);
  //   const totalBuyIn = getTotalBuyIn(preparedHandHistory);
  //   const numberOfPlayers = getNumberOfPlayers(preparedHandHistory);
  //   const prizePool = getPrizePool(preparedHandHistory);
  //   const currency = getCurrency(preparedHandHistory);
  //   const dateStarted = getDateStarted(preparedHandHistory);
  //   const timeStarted = getTimeStarted(preparedHandHistory);
  //   const timeRegion = getTimeRegion(preparedHandHistory);
  //   const first = getFirst(preparedHandHistory);
  //   const firstCountry = getFirstCountry(preparedHandHistory);
  //   const second = getSecond(preparedHandHistory);
  //   const secondCountry = getSecondCountry(preparedHandHistory);
  //   const third = getThird(preparedHandHistory);
  //   const thirdCountry = getThirdCountry(preparedHandHistory);
  //   const result = getResult(preparedHandHistory);

  return {
    tournamentNumber,
    //     buyIn,
    //     rake,
    //     totalBuyIn,
    //     numberOfPlayers,
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
  };
}

export function putIntoArrayAndRemoveNewLines(data: string): string[] {
  if (!data || data === "") throw new Error(`No data found`);
  const newLineTagsRemoved = data.replace(/(\r\n|\n|\r)/gm, "");
  const arrayOfWords = newLineTagsRemoved.split(" ");
  return arrayOfWords;
}

export function getTournamentNumber(data: string[]): number {
  const arrayOfHashedWords = data.find((word) => word.startsWith("#"));
  if (!arrayOfHashedWords)
    throw new Error("No words starting with hashtags found");
  const tournamentNumber = arrayOfHashedWords?.substring(1) as string;
  return parseInt(tournamentNumber);
}

export function getBuyIn(data: string[]): number | null {
  const word = findWord(data, `Hold'emBuy-In:`, 1);
  const buyInAndRakeTuple = word?.split("/");
  const parsedToNumbersTuple = buyInAndRakeTuple?.map((price) =>
    price.startsWith("$") ? parseFloat(price.substring(1)) : parseFloat(price),
  );
  if (!parsedToNumbersTuple || !parsedToNumbersTuple.length)
    return returnNullAndWarn(`Tuple is falsey`);
  const buyIn = parsedToNumbersTuple[0]! + parsedToNumbersTuple[1]!;
  return buyIn;
}
