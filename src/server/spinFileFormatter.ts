// interface Statistics {
//   tournamentNumber: string
//   buyIn: string
//   rake: string
//   totalBuyIn: string
//   numberOfPlayers: string
//   prizePool: string
//   currency: string
//   dateStarted: string
//   timeStarted: string
//   timeRegion: string
//   first: string
//   firstCountry?: string
//   second: string
//   secondCountry?: string
//   third: string
//   thirdCountry?: string
//   result: string
// }

// export function spinFileFormatter(text: string): Statistics | null {
//   const textArray = text.replace(/(\r\n|\n|\r)/gm, '').split(' ')
//   if (!text || text === '' || textArray.length === 0) return null

//   const textInBrackets = text
//     ?.match(/\(([^()]*)\)/g)
//     ?.map(($0) => $0.substring(1, $0.length - 1))

//   if (!textInBrackets || textInBrackets?.length === 0 || !textInBrackets[1])
//     return null

//   const buyInInfo = getElementWordBasedOnIndex(
//     textArray,
//     "Hold'emBuy-In:"
//   ).split('/')

//   const tournamentNumber = getElementWordBasedOnIndex(
//     textArray,
//     'Tournament'
//   ).replace(/[^0-9]/g, '')

//   const buyIn = buyInInfo[0]
//   const rake = buyInInfo[1]

//   const totalBuyIn =
//     '$' +
//     (Number(buyIn.replace('$', '')) + Number(rake.replace('$', ''))).toString()

//   const numberOfPlayers = getElementWordBasedOnIndex(
//     textArray,
//     'playersTotal',
//     -1
//   ).slice(-1)

//   const prizePool = getElementWordBasedOnIndex(textArray, 'Pool:')
//   const currency = getElementWordBasedOnIndex(textArray, 'started', -2)
//   const dateStarted = getElementWordBasedOnIndex(textArray, 'started')
//   const timeStarted = getElementWordBasedOnIndex(textArray, 'started', 2)
//   const timeRegion = getElementWordBasedOnIndex(textArray, 'started', 3)
//   const first = getElementWordBasedOnIndex(textArray, '1:')
//   const firstCountry =
//     textInBrackets[1] === '100%' ? textInBrackets[0] : textInBrackets[2]
//   const second = getElementWordBasedOnIndex(textArray, '2:')
//   const secondCountry =
//     textInBrackets[1] === '100%' ? textInBrackets[2] : textInBrackets[1]
//   const third = getElementWordBasedOnIndex(textArray, '3:')
//   const thirdCountry =
//     textInBrackets[1] === '100%' ? textInBrackets[3] : textInBrackets[2]
//   const result = getElementWordBasedOnIndex(textArray, 'finished', 2)

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
//   }
// }
