export function hasDuplicates<T>(values: T[]): boolean {
  return new Set(values).size !== values.length;
}
