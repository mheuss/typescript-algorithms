import { Comparisons } from '../../comparisons/constants';
import { ErrorCodes } from '../../constants';
import { PriorityQueueNode } from './priority-queue-node';

export function priorityQueueComparison<T>(
  a: PriorityQueueNode<T>,
  b: PriorityQueueNode<T>
) {
  if (a.priority > b.priority) {
    return Comparisons.GreaterThan;
  } else if (a.priority < b.priority) {
    return Comparisons.LessThan;
  } else if (a.priority === b.priority) {
    return Comparisons.Equal;
  }

  throw {
    code: ErrorCodes.COMPARISON_ERROR,
    message: `I can not compare ${a} and ${b}`,
  };
}
