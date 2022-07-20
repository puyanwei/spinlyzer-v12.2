export function getPercentage(numerator: number, total: number): string {
  return ((numerator / total) * 100).toFixed(2);
}

export function countHashKeys(
  data: Record<string, string>[],
  keyToCount: string
) {
  const hash = {};
  data.forEach((obj) => {
    const key = obj[keyToCount];
    hash[key] = hash[key] ? hash[key] + 1 : 1;
  });
  const reorderedObjectByNumberOfDuplicateKeys = hash;
  return reorderedObjectByNumberOfDuplicateKeys;
}

export function getElementWordBasedOnIndex(
  array: string[],
  startingWord: string,
  elementMovement: number = 1
) {
  if (array.length === 0 || !startingWord) return null;
  return array[array?.indexOf(startingWord) + elementMovement];
}
