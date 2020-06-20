import { Comparisons } from '../../../comparisons/constants';
import { MaxPriorityQueue } from './index';

describe('Priority Queue', () => {
  it('Should initialize with the correct comparision value', () => {
    const queue = new MaxPriorityQueue();
    const minOrMax = 'minOrMax';
    const Heap = 'heap';
    expect(queue[Heap][minOrMax]).toEqual(Comparisons.GreaterThan);
  });
});
