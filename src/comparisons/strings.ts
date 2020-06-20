import { ErrorCodes } from '../constants';
import { Comparisons } from './constants';

/**
 * Simple string comparison function that makes use of string.localeCompare
 * @param {string} a
 * @param {string} b
 * @returns {Comparisons}
 * @throws {ErrorCodes.COMPARISON_ERROR}
 */
export function stringComparison(a: string, b: string): Comparisons {
  try {
    return a.localeCompare(b);
  } catch (e) {
    throw {
      code: ErrorCodes.COMPARISON_ERROR,
      message: `I can not compare ${a} and ${b}`,
    };
  }
}
