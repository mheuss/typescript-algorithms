import { Comparisons } from '../../../comparisons/constants';
import { MinPriorityQueue } from './index';

describe('Priority Queue', () => {
  it('Should initialize with the correct comparision value', () => {
    const queue = new MinPriorityQueue();
    const minOrMax = 'minOrMax';
    const Heap = 'heap';
    expect(queue[Heap][minOrMax]).toEqual(Comparisons.LessThan);
  });
});
