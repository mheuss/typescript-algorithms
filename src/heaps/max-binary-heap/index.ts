import { ComparisonFunction } from "../../comparisons/constants";
import { MaxDAryHeap } from "../max-d-ary-heap";

/**
 * Implementation of a max binary heap.
 * Has a generic that contains the interface of the object we are storing in the heap
 */
export class MaxBinaryHeap<T> extends MaxDAryHeap<T> {
  constructor(comparisonFunction?: ComparisonFunction<T>) {
    super({
      comparisonFunction,
      maxNumberOfChildren: 2,
    });
  }
}
