import { ComparisonFunction, Comparisons } from '../comparisons/constants';

export interface IBaseHeapParameters<T> {
  minOrMax: Comparisons.GreaterThan | Comparisons.LessThan;
  comparisonFunction?: ComparisonFunction<T> | undefined;
  maxNumberOfChildren: number;
}

export type IMaxDAryHeapParameters<T> = Omit<
  IBaseHeapParameters<T>,
  'minOrMax'
>;
