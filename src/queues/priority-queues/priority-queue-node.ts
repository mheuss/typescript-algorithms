export class PriorityQueueNode<T> {
  public value: T;
  public priority: number;

  constructor(value: T, priority: number) {
    this.value = value;
    this.priority = priority;
  }
}
