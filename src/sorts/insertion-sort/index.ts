import { cloneDeep } from 'lodash';
import { SelectComparisonFunction } from '../../comparisons';
import { Comparisons } from '../../comparisons/constants';
import { ComparisonFunction } from '../types';

function countDown<T>(
  arr: T[],
  currentCounter: number,
  comparison: ComparisonFunction<T>
) {
  const currentValue = arr[currentCounter];

  let rightToLeftCounter = currentCounter - 1;
  for (
    ;
    rightToLeftCounter >= 0 &&
    comparison(arr[rightToLeftCounter], currentValue) ===
      Comparisons.GreaterThan;
    rightToLeftCounter--
  ) {
    arr[rightToLeftCounter + 1] = arr[rightToLeftCounter];
  }

  arr[rightToLeftCounter + 1] = currentValue;
}

export function InsertionSort<T>(
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

  for (
    let leftToRightCounter = 1;
    leftToRightCounter < clonedArray.length;
    leftToRightCounter++
  ) {
    countDown(
      clonedArray,
      leftToRightCounter,
      sortMechanismToBePassedIntoHelper!
    );
  }

  return clonedArray;
}
