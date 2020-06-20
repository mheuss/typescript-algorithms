import { SingleLinkedList } from '../../linked-lists/single-linked-list';

/**
 * Generic stack implementation.
 */
export class Stack<T> {
  private queue: SingleLinkedList<T>;

  constructor() {
    this.queue = new SingleLinkedList<T>();
  }

  /**
   * Removes item from the top of the stack and returns it.
   * @returns Item on top of the stack. If no item is on the top, returns undefined
   */
  public get = (): T | undefined => {
    return this.queue.shift();
  };

  /**
   * Place item on top of the stack.
   * @returns {number} Length of the stack
   */
  public put = (newElement: T): number => {
    this.queue.unshift(newElement);
    return this.length();
  };

  /**
   * @returns number of items on the stack
   */
  public length = () => {
    return this.queue.getLength();
  };

  /**
   * @returns {Array} An array representing all items in a stack.
   */
  public toArray = (): T[] => {
    return this.queue.toArray();
  };

  /**
   * Removes all items from a stack, and reduces the length to zero
   */
  public discard = () => {
    this.queue.empty();
  };

  /**
   * When given an array, places all items into the stack, preserving array order
   * @param incomingArray
   */
  public load = (incomingArray: T[]): number => {
    incomingArray.reverse().forEach(item => {
      this.put(item);
    });

    return this.length();
  };
}
