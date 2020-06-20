import { ErrorCodes } from '../constants';
import { ComparisonFunction } from './constants';
import { numericComparison } from './numbers';
import { stringComparison } from './strings';

/**
 * This function is used commonly to return the correct comparison function for a type of data.
 * @param incomingArray Array of data we will be looking at
 * @param comparison Function, if provided, that'll be used for comparing.
 * @throws If there is not a comparison function provided AND we are not dealing with numbers or string
 * @constructor
 */
export function SelectComparisonFunction<T>(
  incomingArray: T[],
  comparison?: ComparisonFunction<T>
): ComparisonFunction<T> {
  const sortMechanismToBePassedIntoHelper = comparison;

  if (sortMechanismToBePassedIntoHelper === undefined) {
    if (
      typeof incomingArray[0] === 'string' ||
      incomingArray[0] instanceof String
    ) {
      // @ts-ignore
      return stringComparison;
    } else if (typeof incomingArray[0] === 'number') {
      // @ts-ignore
      return numericComparison;
    } else {
      throw {
        code: ErrorCodes.COMPARISON_FUNCTION_REQUIRED,
        message:
          'A custom comparison function is needed for arrays of types other than string or numbers',
      };
    }
  } else {
    return sortMechanismToBePassedIntoHelper;
  }
}
