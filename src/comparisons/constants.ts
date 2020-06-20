export enum Comparisons {
  LessThan = -1,
  Equal,
  GreaterThan,
}

export type ComparisonFunction<T> = (a: T, b: T) => Comparisons;
