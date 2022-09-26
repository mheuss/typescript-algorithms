import { MinBinaryHeap } from "../../../heaps/min-binary-heap";
import { BasePriorityQueue } from "../base";
import { priorityQueueComparison } from "../priority-queue-comparison";
import { PriorityQueueNode } from "../priority-queue-node";

/**
 * Provides a priority queue, with lowest number being the high priority.
 */
export class MinPriorityQueue<T> extends BasePriorityQueue<T> {
  constructor() {
    super(new MinBinaryHeap<PriorityQueueNode<T>>(priorityQueueComparison));
  }
}
