import { MaxBinaryHeap } from "../../heaps/max-binary-heap";
import { MinBinaryHeap } from "../../heaps/min-binary-heap";
import { PriorityQueueNode } from "./priority-queue-node";

export class BasePriorityQueue<T> {
  protected heap: MaxBinaryHeap<PriorityQueueNode<T>>;

  constructor(
    heap:
      | MaxBinaryHeap<PriorityQueueNode<T>>
      | MinBinaryHeap<PriorityQueueNode<T>>
  ) {
    this.heap = heap;
  }

  public getLength = () => {
    return this.heap.getLength();
  };

  public enqueue = (value: T, priority: number) => {
    const node = new PriorityQueueNode<T>(value, priority);
    this.heap.push(node);
  };

  public dequeue = (): T | undefined => {
    const node = this.heap.pop();
    return node === undefined ? undefined : node.value;
  };

  public empty = () => {
    return this.heap.empty();
  };

  public getQueueContents = (): Array<PriorityQueueNode<T>> => {
    return this.heap.getHeapContents();
  };

  public setQueueContents = (value: Array<PriorityQueueNode<T>>) => {
    this.heap.pushArray(value);
  };
}
