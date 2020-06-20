import { ErrorCodes } from '../../constants';
import { SingleLinkedList } from './index';

const HEAD = 'head';
const TAIL = 'tail';

const FIND_ITEM = 'getNode';

describe('Single Linked List Unit Tests', () => {
  describe('Reverse', () => {
    it('Should do nothing is the list contains 1 or less items', () => {
      const list = new SingleLinkedList<number>();
      list.push(1);
      expect(list.reverse().toArray()).toEqual([1]);
    });

    it('Should reverse the list', () => {
      const list = new SingleLinkedList<number>();
      list.pushArray([1, 2, 3]);
      expect(list.reverse().toArray()).toEqual([3, 2, 1]);
    });
  });

  describe('Remove', () => {
    it('Should remove an item from the beginning of the list', () => {
      const list = new SingleLinkedList<number>();
      const arr: number[] = [1, 2, 3];
      list.pushArray(arr);

      expect(list.remove(0)).toEqual(1);
      expect(list.getLength()).toEqual(2);
      expect(list.toArray()).toEqual([2, 3]);
    });

    it('Should remove an item from the end of the list', () => {
      const list = new SingleLinkedList<number>();
      const arr: number[] = [1, 2, 3];
      list.pushArray(arr);

      expect(list.remove(2)).toEqual(3);
      expect(list.getLength()).toEqual(2);
      expect(list.toArray()).toEqual([1, 2]);
    });

    it('Should remove an item from the middle of the list', () => {
      const list = new SingleLinkedList<number>();
      const arr: number[] = [1, 2, 3];
      list.pushArray(arr);

      expect(list.remove(1)).toEqual(2);
      expect(list.getLength()).toEqual(2);
      expect(list.toArray()).toEqual([1, 3]);
    });

    it('Should throw if passed in a negative number', () => {
      const list = new SingleLinkedList<number>();
      const arr: number[] = [1, 2, 3];
      list.pushArray(arr);

      try {
        list.remove(-1);
        fail('Should have thrown, baby');
      } catch (e) {
        expect(e.code).toEqual(ErrorCodes.OPERATION_BEYOND_BOUNDS);
      }
    });

    it('Should throw if passed in too large number', () => {
      const list = new SingleLinkedList<number>();
      const arr: number[] = [1, 2, 3];
      list.pushArray(arr);

      try {
        list.remove(100);
        fail('Should have thrown, baby');
      } catch (e) {
        expect(e.code).toEqual(ErrorCodes.OPERATION_BEYOND_BOUNDS);
      }
    });

    it('Should throw on an empty list', () => {
      const list = new SingleLinkedList<number>();

      try {
        list.remove(-1);
        fail('Should have thrown. No items in list');
      } catch (e) {
        expect(e.code).toEqual(ErrorCodes.OPERATION_BEYOND_BOUNDS);
      }
    });
  });

  describe('Insert', () => {
    it('Should throw if we attempt to insert out of bounds', () => {
      try {
        const list = new SingleLinkedList<number>();
        list.insert(14, 6);
        fail('Should have thrown since the index is out of bounds');
      } catch (e) {
        expect(e.code).toEqual(ErrorCodes.OPERATION_BEYOND_BOUNDS);
      }
    });

    it('Should insert a node in the beginning if the list length was zero', () => {
      const list = new SingleLinkedList<number>();
      list.insert(0, 6);
      expect(list.getLength()).toEqual(1);
      expect(list.toArray()).toMatchSnapshot();
    });

    it('Should throw if getNode returns bad data', () => {
      const list = new SingleLinkedList<number>();
      const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 10];
      list.pushArray(arr);
      list[FIND_ITEM] = jest.fn().mockReturnValue(null);

      try {
        list.insert(4, 6);
        fail('Should have thrown since the index is out of bounds');
      } catch (e) {
        expect(e.code).toEqual(ErrorCodes.OPERATION_BEYOND_BOUNDS);
      }
    });

    it('Should insert a node at the end', () => {
      const list = new SingleLinkedList<number>();
      const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      list.pushArray(arr);
      list.insert(9, 10);
      expect(list.getLength()).toEqual(10);
      expect(list.toArray()).toMatchSnapshot();
    });

    it('Should insert a node in the middle', () => {
      const list = new SingleLinkedList<number>();
      const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 10];
      list.pushArray(arr);
      list.insert(8, 9);
      expect(list.getLength()).toEqual(10);
      expect(list.toArray()).toMatchSnapshot();
    });
  });

  describe('UnShift', () => {
    it('Should be able to unshift an item onto an empty list', () => {
      const list = new SingleLinkedList<number>();
      list.unshift(3);

      expect(list.getLength()).toEqual(1);
      expect(list[HEAD]?.payload).toEqual(3);
      expect(list[TAIL]?.payload).toEqual(3);
    });

    it('Should be able to unshift an item onto a populated list', () => {
      const list = new SingleLinkedList<number>();
      list.pushArray([2, 3, 4]);
      list.unshift(1);

      expect(list.getLength()).toEqual(4);
      expect(list[HEAD]?.payload).toEqual(1);
      expect(list[TAIL]?.payload).toEqual(4);
    });
  });

  describe('Shift', () => {
    it('Should return undefined for empty list', () => {
      const list = new SingleLinkedList<number>();
      const node = list.shift();
      expect(node).toBeUndefined();
    });

    it('Should value for list of one item', () => {
      const list = new SingleLinkedList<number>();
      list.push(6);
      const value = list.shift();
      expect(value).toEqual(6);
      expect(list.getLength()).toEqual(0);
      expect(list[HEAD]).toBeNull();
      expect(list[TAIL]).toBeNull();
    });

    it('Should shift off a list of many items', () => {
      const list = new SingleLinkedList<number>();
      list.pushArray([1, 2, 3, 4, 5, 6, 7]);
      const value = list.shift();
      expect(value).toEqual(1);
      expect(list.getLength()).toEqual(6);
      expect(list[HEAD]?.payload).toEqual(2);
      expect(list[TAIL]?.payload).toEqual(7);
    });
  });

  describe('POP', () => {
    it('Should return a undefined with an empty list', () => {
      const list = new SingleLinkedList<number>();
      const node = list.pop();
      expect(node).toBeUndefined();
    });

    it('Should empty list and return item payload if there is only 1 item in the list', () => {
      const list = new SingleLinkedList<string>();
      const payload = 'apple';
      list.push(payload);
      const value = list.pop();
      expect(value).toEqual(payload);
      expect(list.getLength()).toEqual(0);
      expect(list[HEAD]).toBeNull();
      expect(list[TAIL]).toBeNull();
    });

    it('Should return undefined if underlying find returns a null', () => {
      const list = new SingleLinkedList<string>();
      list[FIND_ITEM] = jest.fn().mockReturnValue(null);

      list.pushArray(['apple', 'pear']);
      const value = list.pop();
      expect(value).toBeUndefined();
    });

    it('Should pop requested item', () => {
      const list = new SingleLinkedList<string>();

      list.pushArray(['apple', 'pear', 'orange', 'banana']);
      const value = list.pop();
      expect(value).toEqual('banana');
      expect(list.getLength()).toEqual(3);
      expect(list[TAIL]?.payload).toEqual('orange');
    });
  });

  describe('Push', () => {
    const list = new SingleLinkedList<string>();

    it('Should allow an item to be pushed onto an empty list', () => {
      list.push('First Item');
      expect(list[HEAD]).toMatchSnapshot();
      expect(list.getLength()).toEqual(1);
    });

    it('Should allow an item to be pushed onto a list with a preexisting item', () => {
      list.push('Second Item');
      expect(list[HEAD]).toMatchSnapshot();
      expect(list.getLength()).toEqual(2);
    });

    it('Take advantage of the returned list to push multiple items', () => {
      list.push('Third Item').push('Fourth Item');
      expect(list[HEAD]).toMatchSnapshot();
      expect(list.getLength()).toEqual(4);
    });
  });

  describe('Push Array', () => {
    const list = new SingleLinkedList<number>();

    it('Should allow us to push an array into an empty list', () => {
      list.pushArray([1, 2, 3, 4, 5, 6, 7]);
      expect(list[HEAD]).toMatchSnapshot();
      expect(list.getLength()).toEqual(7);
    });

    it('Should allow us to push an array to the end of an existing list', () => {
      list.pushArray([8, 9, 10]);
      expect(list[HEAD]).toMatchSnapshot();
      expect(list.getLength()).toEqual(10);
    });

    it('Should allow us to chain', () => {
      list.pushArray([11, 12, 13]).push(14);
      expect(list[HEAD]).toMatchSnapshot();
      expect(list.getLength()).toEqual(14);
    });
  });
});
