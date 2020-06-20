import { Comparisons } from '../../comparisons/constants';
import { BaseHeap } from '../base';
import { IMaxDAryHeapParameters } from '../types';

/**
 * Implementation of a min heap, with d number of children.
 * Has a generic that contains the interface of the object we are storing in the heap
 */
export class MinDAryHeap<T> extends BaseHeap<T> {
  constructor(options: IMaxDAryHeapParameters<T>) {
    super({ ...options, minOrMax: Comparisons.LessThan });
  }
}
