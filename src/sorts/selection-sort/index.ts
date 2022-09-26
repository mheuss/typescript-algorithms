import { cloneDeep } from "lodash";
import { SelectComparisonFunction } from "../../comparisons";
import { Comparisons } from "../../comparisons/constants";
import { ComparisonFunction } from "../types";

function FindSmallest<T>(
  target: number,
  arr: T[],
  comparison: ComparisonFunction<T>
) {
  let smallest = arr[target];
  let source = target;

  for (let counter = target; counter < arr.length; counter++) {
    if (comparison(smallest, arr[counter]) === Comparisons.GreaterThan) {
      source = counter;
      smallest = arr[counter];
    }
  }

  if (source === target) {
    return;
  }

  const bucket = arr[target];
  arr[target] = arr[source];
  arr[source] = bucket;
}

export function SelectionSort<T>(
  incomingArray: T[],
  comparison?: ComparisonFunction<T>
): T[] {
  if (incomingArray.length <= 1) {
    return incomingArray;
  }

  const clonedArray = cloneDeep(incomingArray);

  const sortMechanismToBePassedIntoHelper = SelectComparisonFunction(
    clonedArray,
    comparison
  );

  for (let counter = 0; counter < clonedArray.length; counter++) {
    FindSmallest<T>(counter, clonedArray, sortMechanismToBePassedIntoHelper);
  }
  return clonedArray;
}
