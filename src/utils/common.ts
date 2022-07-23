import { string } from 'zod';

export function getPercentage(numerator: number, total: number): string {
  return ((numerator / total) * 100).toFixed(2);
}

export function countHashKeys(
  data: Record<string, string>[],
  value: string
): Record<string, number> | null | {} {
  if (!data) return null;

  const valuesCounter = data.reduce<Record<string, number>>((obj, item) => {
    const resolvedValue = item[value];
    if (!resolvedValue) return obj;
    const valueHasNumberSoKeyAlreadyExists = Number.isInteger(
      obj[resolvedValue]
    );
    if (!valueHasNumberSoKeyAlreadyExists) obj[resolvedValue] = 0;

    const currentValue = obj[resolvedValue] as number;
    obj[resolvedValue] = currentValue + 1;

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
