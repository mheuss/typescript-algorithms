import { ErrorCodes } from "../../constants";
import { LinkedList } from "../base";
import { IFindType, SearchFunction } from "../single-linked-list/types";
import { DoublyLinkedNode } from "./doubly-linked-node";

/**
 * Double linked list implementation.
 * Accepts a generic for the payload that we want to carry in the list.
 */
export class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyLinkedNode<T> | null = null;
  protected tail: DoublyLinkedNode<T> | null = null;

  /**
   * Adds a single item of T to the end of the list.
   * @param newItem Item of T to be added
   * @returns The current DoublyLinkedList instance
   */
  public push = (newItem: T): DoublyLinkedList<T> => {
    if (this.tail === null) {
      this.head = new DoublyLinkedNode(newItem);
      this.tail = this.head;
      this.length = 1;
      return this;
    }

    const newNode = new DoublyLinkedNode<T>(newItem);
    const oldTail = this.tail;

    oldTail.next = newNode;
    newNode.previous = oldTail;
    this.tail = newNode;

    this.length++;

    return this;
  };

  /**
   * Adds an array of T items to the end of the list, in array order.
   * @param newItem T[] to be added
   * @returns The current SingleLinkedList instance
   */
  public pushArray = (newItem: T[]) => {
    newItem.forEach((item) => {
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

    const newTail = itemToBePopped.previous;

    if (newTail === null) {
      throw {
        code: ErrorCodes.LIST_IS_BROKEN_INTERNALLY,
        message: "Previous item in >1 item list doesn't exist",
      };
    }

    newTail.next = null;
    this.tail = newTail;
    this.length--;

    return itemToBePopped.payload;
  };

  /**
   * Reverses the list
   * @returns {DoublyLinkedList} Instance
   */
  public reverse = (): DoublyLinkedList<T> => {
    if (this.length <= 1) {
      return this;
    }
    const arr = this.toArray().reverse();
    this.empty();

    this.pushArray(arr);
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
    if (this.head?.previous) {
      this.head.previous = null;
    }

    return itemToBeShifted.payload;
  };

  /**
   * Adds item to the beginning of the list
   * @param newItem
   * @returns {SingleLinkedList} The current instance
   */
  public unshift = (newItem: T): DoublyLinkedList<T> => {
    if (!this.head) {
      return this.push(newItem);
    }

    const node = new DoublyLinkedNode(newItem);
    node.next = this.head;
    this.head.previous = node;
    this.head = node;
    this.length++;

    return this;
  };

  /**
   * Inserts a new node with the value passed in at the index provided.
   * @param index
   * @param value
   * @returns {SingleLinkedList} instance
   * @throws {ErrorCodes.OPERATION_BEYOND_BOUNDS} When index points beyond the length
   */
  public insert = (index: number, value: T): DoublyLinkedList<T> => {
    if (index === 0) {
      this.unshift(value);
      return this;
    }

    if (index === this.length) {
      this.push(value);
      return this;
    }

    const preObject = this.getNode(index - 1) as DoublyLinkedNode<T>;

    if (!preObject) {
      throw {
        code: ErrorCodes.OPERATION_BEYOND_BOUNDS,
        message: "Operation beyond bounds",
      };
    }

    const postObject = preObject.next;
    if (!postObject) {
      this.push(value);
      return this;
    }

    const newNode = new DoublyLinkedNode<T>(value);

    preObject.next = newNode;
    newNode.previous = preObject;

    newNode.next = postObject;
    postObject.previous = newNode;

    this.length++;

    return this;
  };

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
        message: "Index is out of bounds",
      };
    }

    const pre = this.getNode(index - 1) as DoublyLinkedNode<never>;

    if (pre === null) {
      return this.shift();
    }

    const node = pre.next;

    if (node === null) {
      throw {
        code: ErrorCodes.OPERATION_BEYOND_BOUNDS,
        message: "Index is out of bounds",
      };
    }

    const post = node.next;

    if (post === null) {
      return this.pop();
    }

    pre.next = post;
    post.previous = pre;

    this.length--;

    return node.payload;
  };

  /**
   * Uses the passed in function to find the last instance that matches, and returns that index and value that was matched against.
   * @param {SearchFunction} findComparison Function that contains the logic of the saerch. It is expected to return true if the
   * value of the item in the list matches what is being searched for - otherwise returns false.
   * @returns {IFindType | undefined} Either undefined if no matches, or Object contains the value of the matching item and the index it occupies in the list
   */
  public findLast = (
    findComparison: SearchFunction<T>
  ): IFindType<T> | undefined => {
    let current = this.tail;
    let index = this.length - 1;

    if (!current) {
      return undefined;
    }

    do {
      if (findComparison(current.payload)) {
        return {
          index,
          value: current.payload,
        };
      }
      index--;
      current = current.previous;
    } while (current);

    return undefined;
  };

  public getNode = (index: number): null | DoublyLinkedNode<T> => {
    const halfway = Math.floor(this.length / 2);
    if (index <= halfway) {
      return this.getNodeInternal(
        index,
        this.length,
        this.head
      ) as DoublyLinkedNode<T>;
    }

    if (index === this.length - 1) {
      return this.tail;
    }

    let skips = this.length - 1;
    let current: DoublyLinkedNode<T> | null = this.tail;
    do {
      if (current === null) {
        // Should never happen
        throw {
          code: ErrorCodes.LIST_IS_BROKEN_INTERNALLY,
          message: "List appears to be broken",
        };
      }
      current = current.previous;
      skips--;
    } while (skips > index);

    return current;
  };
}
