import { Queue } from './index';

describe('Queue', () => {
  const queue = new Queue<number>();

  it('Should allow us to enqueue an item', () => {
    queue.enqueue(2);
    expect(queue.toArray()).toMatchSnapshot();
    expect(queue.length()).toEqual(1);
  });

  it('Should allow us to dequeue an item', () => {
    const value = queue.dequeue();
    expect(value).toEqual(2);
    expect(queue.length()).toEqual(0);
  });

  it('Should give us undefined if nothing to dequeue', () => {
    expect(queue.dequeue()).toBeUndefined();
  });

  it('Should load an array of items', () => {
    queue.load([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(queue.toArray()).toMatchSnapshot();
    expect(queue.length()).toEqual(10);
  });

  it('Should clear the queue out', () => {
    queue.empty();
    expect(queue.length()).toEqual(0);
  });
});
