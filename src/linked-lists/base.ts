import { ErrorCodes } from "../constants";
import { ListNode } from "./single-linked-list/list-node";
import {
  FindTypes,
  IFindType,
  SearchFunction,
} from "./single-linked-list/types";

export class LinkedList<T> {
  protected length: number;
  protected head: ListNode<T> | null;
  protected tail: ListNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * @returns Current length of list
   */
  public getLength = (): number => this.length;

  /**
   * Returns a linked list as an array.
   * @returns
   */
  public toArray = (): T[] => {
    const output: T[] = [];

    let currentNode = this.head;
    if (currentNode === null) {
      return output;
    }

    do {
      output.push(currentNode.payload);
      currentNode = currentNode.next;
    } while (currentNode !== null);

    return output;
  };

  /**
   * Uses the passed in function to find the first instance that matches, and returns that index and value that was matched against.
   * @param {SearchFunction} findComparison Function that contains the logic of the saerch. It is expected to return true if the
   * value of the item in the list matches what is being searched for - otherwise returns false.
   * @returns {IFindType | undefined} Either undefined if no matches, or Object contains the value of the matching item and the index it occupies in the list
   */
  public findFirst = (
    findComparison: SearchFunction<T>
  ): IFindType<T> | undefined => {
    let current = this.head;
    let index = 0;

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
      index++;
      current = current.next;
    } while (current);

    return undefined;
  };

  /**
   * Finds all instances of matches found in a given list.
   * @param {SearchFunction} findComparison Function that contains the logic of the saerch. It is expected to return true if the
   * value of the item in the list matches what is being searched for - otherwise returns false.
   * @returns {FindTypes} Array of IFindType value. If no match, the array will be ewmpty
   */
  public findAll = (findComparison: SearchFunction<T>): FindTypes<T> => {
    let current = this.head;
    let index = 0;
    const matches: FindTypes<T> = [];

    if (!current) {
      return [];
    }

    do {
      if (findComparison(current.payload)) {
        matches.push({
          index,
          value: current.payload,
        });
      }
      index++;
      current = current.next;
    } while (current);

    return matches;
  };

  /**
   * Clears a list out
   * @returns Current Instance
   */
  public empty = (): LinkedList<T> => {
    this.length = 0;
    this.head = null;
    this.tail = null;
    return this;
  };

  /**
   * Returns the value of an item in the list
   * @param index Zero based index of an item in the list
   * @returns Value in that item
   */
  public get = (index: number): undefined | T => {
    const node = this.getNode(index);
    return !node ? undefined : node.payload;
  };

  /**
   * Sets a value at a given in the list
   * @param {number} index Zero based index of a given item in the list
   * @param {any} value The value this item at a given index will be set to
   * @returns {SingleLinkedList} The current SingleLinkedList instance
   */
  public set = (index: number, value: T): LinkedList<T> => {
    const node = this.getNode(index);
    if (!node) {
      throw {
        code: ErrorCodes.FAILED_TO_SET,
        message: "Failed to set the value at the given node",
      };
    }
    node.payload = value;
    return this;
  };

  public getNode = (index: number): null | ListNode<T> => {
    return this.getNodeInternal(index, this.length, this.head);
  };

  protected getNodeInternal(
    index: number,
    length: number,
    head: ListNode<T> | null
  ) {
    if (index >= length || head === null || index < 0) {
      return null;
    }

    if (index === 0) {
      return head;
    }

    let skips = 0;
    let current: ListNode<T> | null = head;
    do {
      if (current === null) {
        // Should never happen
        throw {
          code: ErrorCodes.LIST_IS_BROKEN_INTERNALLY,
          message: "List appears to be broken",
        };
      }
      current = current.next;
      skips++;
    } while (skips < index);

    return current;
  }
}
