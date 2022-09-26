import { cloneDeep } from "lodash";
import { SelectComparisonFunction } from "../../comparisons";
import { Comparisons } from "../../comparisons/constants";
import { ComparisonFunction } from "../types";

function swapTwoItemsInArray<T>(
  incomingArray: T[],
  firstIndex: number,
  secondIndex: number
) {
  [incomingArray[firstIndex], incomingArray[secondIndex]] = [
    incomingArray[secondIndex],
    incomingArray[firstIndex],
  ];
}

function actualPivot<T>(
  incomingArray: T[],
  start: number,
  end: number,
  comparison: ComparisonFunction<T>
) {
  const pivot = incomingArray[start];
  let swapIndex = start;

  for (let i = start + 1; i <= end; i++) {
    if (comparison(pivot, incomingArray[i]) === Comparisons.GreaterThan) {
      swapIndex++;
      swapTwoItemsInArray<T>(incomingArray, swapIndex, i);
    }
  }

  swapTwoItemsInArray(incomingArray, start, swapIndex);
  return swapIndex;
}

function recursiveSort<T>(
  incomingArray: T[],
  leftOfPivot: number,
  rightOfPivot: number,
  comparison: ComparisonFunction<T>
) {
  if (incomingArray.length <= 1) {
    return incomingArray;
  }

  if (leftOfPivot < rightOfPivot) {
    const pivotIndex = actualPivot(
      incomingArray,
      leftOfPivot,
      rightOfPivot,
      comparison
    );

    recursiveSort(incomingArray, leftOfPivot, pivotIndex - 1, comparison);
    recursiveSort(incomingArray, pivotIndex + 1, rightOfPivot, comparison);
  }

  return incomingArray;
}

export function QuickSort<T>(
  incomingArray: T[],
  comparison?: ComparisonFunction<T>
): T[] {
  if (incomingArray.length <= 0) {
    return incomingArray;
  }

  const clonedArray = cloneDeep(incomingArray);
  const sortMechanismToBePassedIntoHelper = SelectComparisonFunction(
    clonedArray,
    comparison
  );

  return recursiveSort<T>(
    incomingArray,
    0,
    incomingArray.length - 1,
    sortMechanismToBePassedIntoHelper
  );
}
