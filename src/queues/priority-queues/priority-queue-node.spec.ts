import { PriorityQueueNode } from './priority-queue-node';

describe('Priority Queue Node unit tests', () => {
  it('Should initialize priority and value when those values are passed into the constructor', () => {
    const node = new PriorityQueueNode<number>(5, 1);
    expect(node.priority).toEqual(1);
    expect(node.value).toEqual(5);
  });
});
