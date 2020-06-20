import { Comparisons } from '../../comparisons/constants';
import { MaxDAryHeap } from './index';

describe('Max D-Ary Heap', () => {
  it('Should initialize with a Comparisons.GreaterThan', () => {
    const heap = new MaxDAryHeap({ maxNumberOfChildren: 3 });
    // @ts-ignore
    expect(heap.minOrMax).toEqual(Comparisons.GreaterThan);
  });
});
