import { Comparisons } from "../comparisons/constants";

export type ComparisonFunction<T> = (a: T, b: T) => Comparisons;
