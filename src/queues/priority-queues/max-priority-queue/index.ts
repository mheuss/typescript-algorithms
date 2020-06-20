import { MaxBinaryHeap } from '../../../heaps/max-binary-heap';
import { BasePriorityQueue } from '../base';
import { priorityQueueComparison } from '../priority-queue-comparison';
import { PriorityQueueNode } from '../priority-queue-node';

/**
 * Provides a priority queue, with highest number being the high priority.
 */
export class MaxPriorityQueue<T> extends BasePriorityQueue<T> {
  constructor() {
    super(new MaxBinaryHeap<PriorityQueueNode<T>>(priorityQueueComparison));
  }
}
