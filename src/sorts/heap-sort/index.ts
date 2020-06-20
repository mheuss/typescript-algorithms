import { ComparisonFunction } from '../../comparisons/constants';
import { MinBinaryHeap } from '../../heaps/min-binary-heap';
import { SingleLinkedList } from '../../linked-lists/single-linked-list';

/**
 * Heap sort.
 * @param incomingArray
 * @param comparisonFunction
 */
export function heapSort<T>(
  incomingArray: T[],
  comparisonFunction?: ComparisonFunction<T>
): T[] {
  const heap = new MinBinaryHeap<T>(comparisonFunction);
  heap.pushArray(incomingArray);

  const queue = new SingleLinkedList<T>();
  while (heap.getLength() !== 0) {
    const item = heap.pop();
    if (item !== undefined) {
      queue.push(item);
    }
  }

  return queue.toArray();
}
