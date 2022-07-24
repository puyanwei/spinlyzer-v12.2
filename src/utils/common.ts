export function getPercentage(numerator: number, total: number): string {
  return ((numerator / total) * 100).toFixed(2);
}

export function countHashKeys<T extends Record<string, string>, U extends keyof T>(data: T[], value: U): Record<string, number> | null {

  if (!data) return null;

  const valuesCounter = data.reduce<Record<string, number>>((obj, item) => {
    const newKey = item[value];
    if (!newKey) return obj;

    const hasExistingNumberValue = Number.isInteger(
      obj[newKey]
    );
    if (!hasExistingNumberValue) obj[newKey] = 0;

    const currentValue = obj[newKey] as number
    obj[newKey] = currentValue + 1;

    return obj;
  }, {});

  return valuesCounter;
}

export function getElementWordBasedOnIndex(
  array: string[],
  startingWord: string,
  elementMovement: number = 1
) {
  if (array.length === 0 || !startingWord) return null;
  return array[array?.indexOf(startingWord) + elementMovement];
}
