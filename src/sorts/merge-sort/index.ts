import { cloneDeep } from 'lodash';
import { SelectComparisonFunction } from '../../comparisons';
import { Comparisons } from '../../comparisons/constants';
import { ComparisonFunction } from '../types';

function merge<T>(
  leftArray: T[],
  rightArray: T[],
  comparison: ComparisonFunction<T>
): T[] {
  const results: T[] = [];

  let leftCounter: number = 0;
  let rightCounter: number = 0;

  while (leftCounter < leftArray.length && rightCounter < rightArray.length) {
    if (
      comparison(rightArray[rightCounter], leftArray[leftCounter]) ===
      Comparisons.GreaterThan
    ) {
      results.push(leftArray[leftCounter]);
      leftCounter++;
    } else {
      results.push(rightArray[rightCounter]);
      rightCounter++;
    }
  }

  while (leftCounter < leftArray.length) {
    results.push(leftArray[leftCounter]);
    leftCounter++;
  }

  while (rightCounter < rightArray.length) {
    results.push(rightArray[rightCounter]);
    rightCounter++;
  }

  return results;
}

function recursiveMerge<T>(
  incomingArray: T[],
  comparison: ComparisonFunction<T>
): T[] {
  if (incomingArray.length <= 1) {
    return incomingArray;
  }

  const midPoint = Math.floor(incomingArray.length / 2);
  const left = recursiveMerge(incomingArray.slice(0, midPoint), comparison);
  const right = recursiveMerge(incomingArray.slice(midPoint), comparison);

  return merge(left, right, comparison);
}

export function MergeSort<T>(
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

  return recursiveMerge<T>(incomingArray, sortMechanismToBePassedIntoHelper);
}
