import { DoublyLinkedNode } from './doubly-linked-node';

describe('List Node unit test', () => {
  it('Should allow for creation of numerous node items', () => {
    const node = new DoublyLinkedNode<number>(5);
    const secondNode = new DoublyLinkedNode<number>(15, node);
    expect(node).toMatchSnapshot();
    expect(secondNode).toMatchSnapshot();
  });
});
