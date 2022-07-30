export function countHashKeys<
  T extends Record<string, string>,
  U extends keyof T,
>(data: T[], value: U): Record<string, number> | null {
  if (!data) return null

  const valuesCounter = data.reduce<Record<string, number>>((obj, item) => {
    const newKey = item[value]
    if (!newKey) return obj

    const hasExistingNumberValue = Number.isInteger(obj[newKey])
    if (!hasExistingNumberValue) obj[newKey] = 0

    const currentValue = obj[newKey] as number
    obj[newKey] = currentValue + 1

    return obj
  }, {})

  return valuesCounter
}

export function findWord(
  array: string[],
  startingWord: string,
  elementMovement: number = 0,
): string | null {
  if (array.length === 0) return returnNullAndWarn(`Data array is empty`, array)
  if (!startingWord)
    return returnNullAndWarn(`No starting word selected`, array)

  const wordIndex = array?.indexOf(startingWord)
  const noMatchingWordFound = wordIndex === -1
  if (noMatchingWordFound) returnNullAndWarn(`No word found`, array)

  const finalIndex = wordIndex + elementMovement
  if (finalIndex < 0)
    return returnNullAndWarn(`Element movement parameter too low`, array)
  if (finalIndex > array.length)
    return returnNullAndWarn(`Element movement parameter too high`, array)

  return array[finalIndex]!
}

export function findCountries(data: string): string[] | null {
  const array = data.split("),")
  const firstCountrySplitByBracket = array[0]?.split("(")

  const firstCountry =
    firstCountrySplitByBracket?.[firstCountrySplitByBracket.length - 1]
  if (!firstCountry) return null

  const secondCountrySplitByBracket = array[1]?.split("(")
  const secondCountry =
    secondCountrySplitByBracket?.[secondCountrySplitByBracket.length - 1]
  if (!secondCountry) return null

  const thirdCountrySplitByBracket = array[1]?.split("(")
  const thirdCountry =
    thirdCountrySplitByBracket?.[thirdCountrySplitByBracket.length - 1]
  if (!thirdCountry) return null

  return [firstCountry, secondCountry, thirdCountry]
}

export function returnNullAndWarn(
  message: string,
  data: string[] = [""],
): null {
  if (!message) throw new Error(`Message not found`)
  console.warn(message, data)
  return null
}
