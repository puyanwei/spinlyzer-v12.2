export function countHashKeys<
  T extends Record<string, string>,
  U extends keyof T,
>(data: T[], value: U): Record<string, number> | null {
  if (!data) return null;

  const valuesCounter = data.reduce<Record<string, number>>((obj, item) => {
    const newKey = item[value];
    if (!newKey) return obj;

    const hasExistingNumberValue = Number.isInteger(obj[newKey]);
    if (!hasExistingNumberValue) obj[newKey] = 0;

    const currentValue = obj[newKey] as number;
    obj[newKey] = currentValue + 1;

    return obj;
  }, {});

  return valuesCounter;
}

export function findWord(
  array: string[],
  startingWord: string,
  elementMovement: number = 0,
) {
  if (array.length === 0 || !startingWord) return null;

  const wordIndex = array?.indexOf(startingWord);
  const noMatchingWordFound = wordIndex === -1;
  if (noMatchingWordFound) throw new Error(`No word found`);

  const finalIndex = wordIndex + elementMovement;
  if (finalIndex < 0) throw new Error(`Element movement parameter too low`);
  if (finalIndex > array.length)
    throw new Error(`Element movement parameter too high`);

  return array[finalIndex];
}
