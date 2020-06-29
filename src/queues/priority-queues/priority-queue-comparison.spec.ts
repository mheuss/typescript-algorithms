import { Comparisons } from '../../comparisons/constants';
import { priorityQueueComparison } from './priority-queue-comparison';

describe('Priority Queue Comparison', () => {
  it('Should correctly identify a greater than', () => {
    expect(
      priorityQueueComparison(
        { value: 'a', priority: 5 },
        {
          priority: 1,
          value: 'b',
        }
      )
    ).toEqual(Comparisons.GreaterThan);
  });

  it('Should correctly identify a left than', () => {
    expect(
      priorityQueueComparison(
        { value: 'a', priority: 5 },
        {
          priority: 10,
          value: 'b',
        }
      )
    ).toEqual(Comparisons.LessThan);
  });

  it('Should correctly identify an equals', () => {
    expect(
      priorityQueueComparison(
        { value: 'a', priority: 5 },
        { value: 'b', priority: 5 }
      )
    ).toEqual(Comparisons.Equal);
  });

  it('Should throw if I provide it garbage', () => {
    expect(() => {
      priorityQueueComparison({ value: 'a', priority: 5 }, {
        banana: 10,
        value: 'b',
      } as any);
    }).toThrowErrorMatchingSnapshot();
  });
});
