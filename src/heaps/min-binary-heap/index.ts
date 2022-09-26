import { ComparisonFunction } from "../../comparisons/constants";
import { MinDAryHeap } from "../min-d-ary-heap";

/**
 * Implementation of a min binary heap.
 * Has a generic that contains the interface of the object we are storing in the heap
 */

export class MinBinaryHeap<T> extends MinDAryHeap<T> {
  constructor(comparisonFunction?: ComparisonFunction<T>) {
    super({
      comparisonFunction,
      maxNumberOfChildren: 2,
    });
  }
}
