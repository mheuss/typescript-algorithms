import { ErrorCodes } from '../../constants';
import { LinkedList } from '../base';
import { ListNode } from './list-node';

/**
 * Single linked list implementation.
 * Accepts a generic for the payload that we want to carry in the list.
 */
export class SingleLinkedList<T> extends LinkedList<T> {
  /**
   * Removes from the list an item at position index, and returns that item.
   * @param {number} index of the item to remove.
   * @returns Value of the item removed
   * @throws {ErrorCodes.OPERATION_BEYOND_BOUNDS} If we pass in a bad index
   */
  public remove = (index: number): T | undefined => {
    if (index < 0 || index >= this.length) {
      throw {
        code: ErrorCodes.OPERATION_BEYOND_BOUNDS,
        message: 'Index is out of bounds',
      };
    }

    const pre = this.getNode(index - 1);

    if (pre === null) {
      return this.shift();
    }

    const node = pre.next;

    if (node === null) {
      throw {
        code: ErrorCodes.OPERATION_BEYOND_BOUNDS,
        message: 'Index is out of bounds',
      };
    }

    const post = node.next;

    if (post === null) {
      return this.pop();
    }

    pre.next = post;
    this.length--;

    return node.payload;
  };

  /**
   * Inserts a new node with the value passed in at the index provided.
   * @param index
   * @param value
   * @returns {SingleLinkedList} instance
   * @throws {ErrorCodes.OPERATION_BEYOND_BOUNDS} When index points beyond the length
   */
  public insert = (index: number, value: T): SingleLinkedList<T> => {
    if (index === 0) {
      this.unshift(value);
      return this;
    }

    if (index === this.length) {
      this.push(value);
      return this;
    }

    const preObject = this.getNode(index - 1);

    if (!preObject) {
      throw {
        code: ErrorCodes.OPERATION_BEYOND_BOUNDS,
        message: 'Operation beyond bounds',
      };
    }

    const postObject = preObject.next;
    if (!postObject) {
      this.push(value);
      return this;
    }

    const newNode = new ListNode<T>(value);
    preObject.next = newNode;
    newNode.next = postObject;
    this.length++;

    return this;
  };

  /**
   * Adds item to the beginning of the list
   * @param newItem
   * @returns {SingleLinkedList} The current SingleLinkedList instance
   */
  public unshift = (newItem: T): SingleLinkedList<T> => {
    const node = new ListNode(newItem);

    if (!this.head) {
      return this.push(newItem);
    }

    node.next = this.head;
    this.head = node;
    this.length++;

    return this;
  };

  /**
   * @returns value at the beginning of the array, or undefined if there is no value to return
   */
  public shift = (): T | undefined => {
    if (this.length === 0 || !this.head) {
      return undefined;
    }

    const itemToBeShifted = this.head;

    if (this.length === 1) {
      this.length = 0;
      this.head = null;
      this.tail = null;
      return itemToBeShifted.payload;
    }

    this.head = itemToBeShifted.next;
    this.length--;

    return itemToBeShifted.payload;
  };

  /**
   * Adds a single item of T to the end of the list.
   * @param newItem Item of T to be added
   * @returns The current SingleLinkedList instance
   */
  public push = (newItem: T): SingleLinkedList<T> => {
    const node = new ListNode(newItem);
    if (this.head === null) {
      this.head = node;
    }

    if (this.tail === null) {
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;

    return this;
  };

  /**
   * Adds an array of T items to the end of the list, in array order.
   * @param newItem T[] to be added
   * @returns The current SingleLinkedList instance
   */
  public pushArray = (newItem: T[]) => {
    newItem.forEach(item => {
      this.push(item);
    });

    return this;
  };

  /**
   * Removes the last item on the list, and returns it
   * @returns Last Item on list, or undefined if no such item exists
   */
  public pop = (): T | undefined => {
    if (this.length === 0 || !this.tail) {
      return undefined;
    }

    const itemToBePopped = this.tail;

    if (this.length === 1) {
      this.empty();
      return itemToBePopped.payload;
    }

    const newLastItem = this.getNode(this.length - 2);
    if (newLastItem === null) {
      return undefined;
    }

    newLastItem.next = null;
    this.tail = newLastItem;
    this.length--;

    return itemToBePopped.payload;
  };

  /**
   * Reverses the list
   * @returns {SingleLinkedList} Instance
   */
  public reverse = (): SingleLinkedList<T> => {
    if (this.length <= 1) {
      return this;
    }
    const arr = this.toArray().reverse();
    this.empty();

    this.pushArray(arr);
    return this;
  };
}
