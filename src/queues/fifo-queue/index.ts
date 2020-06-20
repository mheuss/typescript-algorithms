import { SingleLinkedList } from '../../linked-lists/single-linked-list';

/**
 * Implementation of a FIFO queue. Has a generic that is used to pass in the type of the payload.
 */
export class Queue<T> {
  private queue: SingleLinkedList<T>;

  constructor() {
    this.queue = new SingleLinkedList();
  }

  /**
   * Places the item inside the queu.
   * @param item Item to be stored
   */
  public enqueue = (item: T): number => {
    this.queue.push(item);
    return this.queue.getLength();
  };

  /**
   * Pops an item off the queue
   */
  public dequeue = (): T | undefined => {
    return this.queue.shift();
  };

  /**
   * Empties the queue
   */
  public empty = () => {
    this.queue.empty();
  };

  /**
   * Returns the content of the queue as an array
   */
  public toArray = (): T[] => {
    return this.queue.toArray();
  };

  /**
   * Takes an array, loads it into the queue
   * @param incomingArray
   */
  public load = (incomingArray: T[]) => {
    this.queue.pushArray(incomingArray);
    return this.queue.getLength();
  };

  /**
   * Returns the length of the queue
   */
  public length = (): number => {
    return this.queue.getLength();
  };
}
