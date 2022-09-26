import { cloneDeep } from "lodash";
import { SelectComparisonFunction } from "../../comparisons";
import { Comparisons } from "../../comparisons/constants";
import { ComparisonFunction } from "../types";

function BubbleSortPass<T>(
  arrayOfSomething: T[],
  comparison: ComparisonFunction<T>
) {
  let changes = 0;
  const endPointer = arrayOfSomething.length - 1;

  for (let pointer = 0; pointer < endPointer; pointer++) {
    if (
      comparison(arrayOfSomething[pointer], arrayOfSomething[pointer + 1]) ===
      Comparisons.GreaterThan
    ) {
      const bucket = arrayOfSomething[pointer + 1];
      arrayOfSomething[pointer + 1] = arrayOfSomething[pointer];
      arrayOfSomething[pointer] = bucket;
      changes++;
    }
  }

  return changes;
}

/**
 * This function performs a bubble sort on an array of any type that is passed to it. If something other than numbers
 * and strings are passed in, this function expects a comparison function as well.
 *
 * The array is sorted in place.
 *
 * @param incomingArray Array of anything you want to be sorted
 * @param comparison Function that will compare two items, and return whether the first is larger than the second
 * @throws When an array of something other than strings and numbers is passed in without a comparison function
 * @returns sorted array
 */
export function BubbleSort<T>(
  incomingArray: T[],
  comparison?: ComparisonFunction<T>
): T[] {
  let countOfChanges = 0;

  if (incomingArray.length <= 1) {
    return incomingArray;
  }

  const clonedArray = cloneDeep(incomingArray);

  const sortMechanismToBePassedIntoHelper = SelectComparisonFunction(
    clonedArray,
    comparison
  );

  do {
    countOfChanges = BubbleSortPass(
      clonedArray,
      sortMechanismToBePassedIntoHelper
    );
  } while (countOfChanges !== 0);

  return clonedArray;
}
