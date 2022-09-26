import { SelectComparisonFunction } from "../comparisons";
import { ComparisonFunction, Comparisons } from "../comparisons/constants";
import { IBaseHeapParameters } from "./types";

/**
 * Base heap constructor, has the functionality that is the basis of all heap types.
 */
export class BaseHeap<T> {
  protected data: T[];
  protected maxNumberOfChildren: number;
  protected comparisonFunction: ComparisonFunction<T> | undefined;
  protected minOrMax: Comparisons;

  constructor(options: IBaseHeapParameters<T>) {
    this.data = [];
    this.maxNumberOfChildren = options.maxNumberOfChildren;
    this.comparisonFunction = options.comparisonFunction;
    this.minOrMax = options.minOrMax;
  }

  /**
   * @returns Internal Queue Array
   */
  public getHeapContents = (): T[] => {
    return this.data;
  };

  /**
   * Empties heap
   */
  public empty = () => {
    this.data = [];
  };

  /**
   * @returns The number of items in the heap
   */
  public getLength = () => {
    return this.data.length;
  };

  /**
   * Pushed new items onto the heap
   * @param newValue
   */
  public push = (newValue: T) => {
    this.checkComparisonFunction([newValue]);

    this.data.push(newValue);
    this.bubbleUp(this.data.length - 1);
  };

  public pushArray = (newValues: T[]) => {
    newValues.forEach((value: T) => {
      this.push(value);
    });
  };

  /**
   * Removes an item from the top of the heap
   * @returns Topmost heap item, or undefined if none
   */
  public pop = (): T | undefined => {
    if (this.data.length === 0) {
      return undefined;
    }

    if (this.data.length === 1) {
      const rv = this.data[0];
      this.data = [];
      return rv;
    }

    this.checkComparisonFunction(this.data);

    const returnValue: T = this.data[0];
    this.data[0] = this.data.pop()!;

    this.bubbleDown(0);
    return returnValue;
  };

  private checkComparisonFunction = (incomingData: T[]): void => {
    if (this.comparisonFunction === undefined) {
      this.comparisonFunction = SelectComparisonFunction(incomingData);
    }
  };

  private bubbleDown = (index: number) => {
    if (index < 0 || index >= this.data.length) {
      return;
    }

    let largestChildIndex = this.maxNumberOfChildren * index + 1;

    for (let counter = 2; counter <= this.maxNumberOfChildren; counter++) {
      const childIndex = this.maxNumberOfChildren * index + counter;
      if (
        this.data[childIndex] !== undefined &&
        this.comparisonFunction!(
          this.data[childIndex],
          this.data[largestChildIndex]
        ) === this.minOrMax
      ) {
        largestChildIndex = childIndex;
      }
    }

    if (this.data[largestChildIndex] === undefined) {
      return;
    }

    if (
      this.comparisonFunction!(
        this.data[largestChildIndex],
        this.data[index]
      ) === this.minOrMax
    ) {
      const buffer = this.data[largestChildIndex];
      this.data[largestChildIndex] = this.data[index];
      this.data[index] = buffer;
      this.bubbleDown(largestChildIndex);
      return;
    }

    return;
  };

  private bubbleUp = (index: number) => {
    if (index < 1) {
      return;
    }

    const parentIndex = Math.floor((index - 1) / this.maxNumberOfChildren);
    if (
      this.comparisonFunction!(this.data[index], this.data[parentIndex]) ===
      this.minOrMax
    ) {
      const newIndex = this.data[parentIndex];
      this.data[parentIndex] = this.data[index];
      this.data[index] = newIndex;
    }

    this.bubbleUp(parentIndex);
  };
}
