import { ErrorCodes } from '../constants';
import { Comparisons } from './constants';
import { numericComparison } from './numbers';

describe('Number Comparison Unit Tests for Binary Search Trees', () => {
  it('Greater than', () => {
    expect(numericComparison(5, 3)).toEqual(Comparisons.GreaterThan);
  });

  it('Less Than', () => {
    expect(numericComparison(3, 5)).toEqual(Comparisons.LessThan);
  });

  it('Equal', () => {
    expect(numericComparison(5, 5)).toEqual(Comparisons.Equal);
  });

  it('Error', () => {
    try {
      const value = numericComparison(5, NaN);
      fail(`Should have thrown but got ${value}`);
    } catch (e) {
      expect(e.code).toEqual(ErrorCodes.COMPARISON_ERROR);
    }
  });
});
