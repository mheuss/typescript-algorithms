import { ListNode } from './list-node';

describe('List Node unit test', () => {
  it('Should allow for creation of numerous node items', () => {
    const node = new ListNode<number>(5);
    const secondNode = new ListNode<number>(15, node);
    expect(node).toMatchSnapshot();
    expect(secondNode).toMatchSnapshot();
  });
});
