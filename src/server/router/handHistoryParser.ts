interface Statistics {
  tournamentNumber: string;
  buyIn: string;
  rake: string;
  totalBuyIn: string;
  numberOfPlayers: string;
  prizePool: string;
  currency: string;
  dateStarted: string;
  timeStarted: string;
  timeRegion: string;
  first: string;
  firstCountry: string;
  second: string;
  secondCountry: string;
  third: string;
  thirdCountry: string;
  result: string;
}

// export function handHistoryParser(data: string): string {
//   const preparedHandHistory = putIntoArrayAndRemoveNewLines(data);
//   const tournamentNumber = getTournamentNumber(preparedHandHistory);
//   const buyIn = getBuyIn(preparedHandHistory);
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

//   return {
//     tournamentNumber,
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
//   };
// }
export function putIntoArrayAndRemoveNewLines(data: string) {
  if (!data || data === "") throw new Error(`No data found`);
  const newLineTagsRemoved = data.replace(/(\r\n|\n|\r)/gm, "");
  const arrayOfWords = newLineTagsRemoved.split(" ");
  return arrayOfWords;
}
