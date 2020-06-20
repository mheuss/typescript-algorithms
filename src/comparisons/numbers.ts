import { ErrorCodes } from '../constants';
import { Comparisons } from './constants';

/**
 * Simple numeric comparison function.
 * @param {number} a
 * @param {number} b
 * @throws {ErrorCodes.COMPARISON_ERROR} If it can't compare two numbers.
 * @returns {Comparisons}
 */
export function numericComparison(a: number, b: number): Comparisons {
  if (a > b) {
    return Comparisons.GreaterThan;
  } else if (a < b) {
    return Comparisons.LessThan;
  } else if (a === b) {
    return Comparisons.Equal;
  }

  throw {
    code: ErrorCodes.COMPARISON_ERROR,
    message: `I can not compare ${a} and ${b}`,
  };
}
