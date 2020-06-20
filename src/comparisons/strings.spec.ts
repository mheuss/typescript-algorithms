import { ErrorCodes } from '../constants';
import { Comparisons } from './constants';
import { stringComparison } from './strings';

describe('String Comparisons for binary tree', () => {
  it('Greater THan', () => {
    expect(stringComparison('zoo', 'apple')).toEqual(Comparisons.GreaterThan);
  });

  it('Less THan', () => {
    expect(stringComparison('apple', 'zoo')).toEqual(Comparisons.LessThan);
  });

  it('Equal', () => {
    expect(stringComparison('zoo', 'zoo')).toEqual(Comparisons.Equal);
  });

  it('Throw Exception with bad data', () => {
    try {
      stringComparison(null as any, 'apple');
      fail('Should not get here');
    } catch (e) {
      expect(e.code).toEqual(ErrorCodes.COMPARISON_ERROR);
    }
  });
});
