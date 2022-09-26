import { Comparisons } from "../../comparisons/constants";
import { BaseHeap } from "../base";
import { IMaxDAryHeapParameters } from "../types";

/**
 * Implementation of a max heap, with d number of children.
 * Has a generic that contains the interface of the object we are storing in the heap
 */
export class MaxDAryHeap<T> extends BaseHeap<T> {
  constructor(options: IMaxDAryHeapParameters<T>) {
    super({ ...options, minOrMax: Comparisons.GreaterThan });
  }
}
