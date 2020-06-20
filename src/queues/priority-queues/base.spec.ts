import { MaxBinaryHeap } from '../../heaps/max-binary-heap';
import { BasePriorityQueue } from './base';
import { priorityQueueComparison } from './priority-queue-comparison';
import { PriorityQueueNode } from './priority-queue-node';

describe('Priorty Queue', () => {
  const heap = new MaxBinaryHeap<PriorityQueueNode<string>>(
    priorityQueueComparison
  );
  const queue = new BasePriorityQueue<string>(heap);
  const queueContents = [
    { priority: 4, value: 'Dysentery' },
    { priority: 2, value: 'Broken Rib' },
    { priority: 3, value: 'Flu' },
    { priority: 1, value: 'Cold' },
  ];

  it('Should allow us to push a queue', () => {
    queue.enqueue('Dying', 5);
  });

  it('Should return the queue length', () => {
    expect(queue.getLength()).toEqual(1);
  });

  it('Should allow us to retrieve the sorted queue', () => {
    queue.enqueue('Cold', 1);
    queue.enqueue('Flu', 3);
    queue.enqueue('Dysentery', 4);
    queue.enqueue('Broken Rib', 2);

    expect(queue.getQueueContents()).toEqual([
      { priority: 5, value: 'Dying' },
      { priority: 4, value: 'Dysentery' },
      { priority: 3, value: 'Flu' },
      { priority: 1, value: 'Cold' },
      { priority: 2, value: 'Broken Rib' },
    ]);
  });

  it('Should pop the highest item and adjust the queue accordingly', () => {
    expect(queue.dequeue()).toEqual('Dying');
    expect(queue.getQueueContents()).toEqual(queueContents);
  });

  it('Should clear', () => {
    queue.empty();
    expect(queue.getLength()).toEqual(0);
  });

  it('Should load', () => {
    queue.setQueueContents(queueContents);
    expect(queue.getQueueContents()).toEqual(queueContents);
  });
});
