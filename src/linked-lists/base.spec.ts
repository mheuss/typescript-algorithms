import { ErrorCodes } from '../constants';
import { LinkedList } from './base';
import { ListNode } from './single-linked-list/list-node';

const HEAD = 'head';
const TAIL = 'tail';
const LENGTH = 'length';

describe('Linked List unit tests', () => {
  describe('Get Length', () => {
    it('Should return the list length', () => {
      const list = new LinkedList<number>();
      list[LENGTH] = 2;
      expect(list.getLength()).toEqual(2);
    });
  });

  describe('Empty', () => {
    it('Should empty a list', () => {
      const list = new LinkedList<number>();
      list[HEAD] = constructNodeList([1, 2, 3]);
      list.empty();
      expect(list.getLength()).toEqual(0);
      expect(list[HEAD]).toBeNull();
      expect(list[TAIL]).toBeNull();
    });
  });

  describe('toArray', () => {
    it('Should return an empty array if given an empty list', () => {
      const list = new LinkedList<number>();
      expect(list.toArray()).toEqual([]);
    });

    it('Should return a list as an array', () => {
      const list = new LinkedList<number>();

      list[HEAD] = constructNodeList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(list.toArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe('findFirst', () => {
    it('Should return undefined with empty list', () => {
      const list = new LinkedList<number>();
      expect(list.findFirst(value => value === 7)).toBeUndefined();
    });

    it("Should return undefined if it can't find nuffin", () => {
      const list = new LinkedList<number>();
      list[HEAD] = constructNodeList([1, 2, 3, 4, 5, 6, 7]);
      expect(list.findFirst(value => value === 32)).toBeUndefined();
    });

    it('Should return value if it matches - string', () => {
      const list = new LinkedList<string>();
      list[HEAD] = constructNodeList(['apple', 'pear', 'orange', 'banana']);
      expect(list.findFirst(value => value === 'pear')).toMatchObject({
        index: 1,
        value: 'pear',
      });
    });

    it('should return value if it matches, object', () => {
      const list = new LinkedList<any>();
      list[HEAD] = constructNodeList([
        { firstName: 'Mike' },
        { firstName: 'Bob' },
        { firstName: 'Jim' },
        { firstName: 'Ahtasham' },
        { firstName: 'Nigel' },
      ]);
      expect(list.findFirst(value => value.firstName === 'Jim')).toMatchObject({
        index: 2,
        value: { firstName: 'Jim' },
      });
    });

    it('Should return value if it matches, number, end of list', () => {
      const list = new LinkedList<number>();
      list[HEAD] = constructNodeList([1, 2, 3, 4, 5, 6, 7]);
      expect(list.findFirst(value => value === 7)).toMatchObject({
        index: 6,
        value: 7,
      });
    });

    it('Should return value if it matches, number, beginning of list', () => {
      const list = new LinkedList<number>();
      list[HEAD] = constructNodeList([1, 2, 3, 4, 5, 6, 7]);
      expect(list.findFirst(value => value < 2)).toMatchObject({
        index: 0,
        value: 1,
      });
    });
  });

  describe('findAll', () => {
    it('Should return undefined with empty list', () => {
      const list = new LinkedList<number>();
      expect(list.findAll(value => value === 7)).toEqual([]);
    });

    it("Should return undefined if it can't find nuffin", () => {
      const list = new LinkedList<number>();
      list[HEAD] = constructNodeList([1, 2, 3, 4, 5, 6, 7]);
      expect(list.findAll(value => value === 32)).toEqual([]);
    });

    it('Should return value if it matches - string', () => {
      const list = new LinkedList<string>();
      list[HEAD] = constructNodeList(['apple', 'pear', 'orange', 'banana']);
      expect(list.findAll(value => value === 'pear')).toMatchObject([
        { index: 1, value: 'pear' },
      ]);
    });

    it('should return value if it matches, object', () => {
      const list = new LinkedList<any>();
      list[HEAD] = constructNodeList([
        { firstName: 'Mike' },
        { firstName: 'Bob' },
        { firstName: 'Jim' },
        { firstName: 'Ahtasham' },
        { firstName: 'Nigel' },
      ]);
      expect(list.findAll(value => value.firstName.length === 3)).toMatchObject(
        [
          { index: 1, value: { firstName: 'Bob' } },
          { index: 2, value: { firstName: 'Jim' } },
        ]
      );
    });

    it('Should return value if it matches, number, end of list', () => {
      const list = new LinkedList<number>();
      list[HEAD] = constructNodeList([1, 2, 3, 4, 5, 6, 7]);
      expect(list.findAll(value => value === 7 || value === 3)).toMatchObject([
        { index: 2, value: 3 },
        { index: 6, value: 7 },
      ]);
    });

    it('Should return value if it matches, number, beginning of list', () => {
      const list = new LinkedList<number>();
      list[HEAD] = constructNodeList([1, 2, 3, 4, 5, 6, 7]);
      expect(list.findAll(value => value < 2)).toMatchObject([
        { index: 0, value: 1 },
      ]);
    });
  });

  describe('Get', () => {
    it('Should return undefined if we are beyond the upper bounds ', () => {
      const list = new LinkedList<number>();
      list[HEAD] = constructNodeList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      list[LENGTH] = 9;
      expect(list.get(300)).toBeUndefined();
    });

    it('Should return the value without entering the loop if index be all zero ', () => {
      const list = new LinkedList<number>();
      list[HEAD] = constructNodeList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      list[LENGTH] = 9;
      expect(list.get(0)).toEqual(1);
    });

    it('Should throw if the list is internally broken ', () => {
      const list = new LinkedList<number>();
      list[HEAD] = constructNodeList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      list[LENGTH] = 9;
      // @ts-ignore
      list[HEAD]?.next?.next = null;

      try {
        list.get(8);
        fail('Should have thrown');
      } catch (e) {
        expect(e.code).toEqual(ErrorCodes.LIST_IS_BROKEN_INTERNALLY);
      }
    });

    it('Should return the proper value ', () => {
      const list = new LinkedList<number>();
      list[HEAD] = constructNodeList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      list[LENGTH] = 9;
      expect(list.get(8)).toEqual(9);
      expect(list.get(2)).toEqual(3);
      expect(list.get(5)).toEqual(6);
    });
  });

  describe('Set', () => {
    it('Should return false when told to set beyond bounds', () => {
      const list = new LinkedList<number>();
      const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      list[HEAD] = constructNodeList(arr);
      list[LENGTH] = 9;
      try {
        list.set(100, 7);
        fail('Should have thrown');
      } catch (e) {
        expect(e.code).toEqual(ErrorCodes.FAILED_TO_SET);
      }
    });

    it('should return false when told to set on an empty list', () => {
      const list = new LinkedList<number>();
      try {
        list.set(100, 7);
        fail('Should have thrown');
      } catch (e) {
        expect(e.code).toEqual(ErrorCodes.FAILED_TO_SET);
      }
    });

    it('Should successfully set at a given point', () => {
      const list = new LinkedList<number>();
      const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      list[HEAD] = constructNodeList(arr);
      list[LENGTH] = 9;
      expect(list.set(2, 10)).toBeTruthy();
      expect(list.toArray()).toMatchSnapshot();
    });
  });
});

/*  ------------ Helper Functions ---------------*/

function constructNodeList<T>(incomingArray: T[]): ListNode<T> | null {
  if (incomingArray.length === 0) {
    return null;
  }

  const node = new ListNode<T>(incomingArray.shift() as T);
  addAdditionalNodes<T>(incomingArray, node);
  return node;
}

function addAdditionalNodes<T>(
  incomingArray: T[],
  previousNode: ListNode<T>
): ListNode<T> {
  if (incomingArray.length === 0) {
    return previousNode;
  }

  const node = new ListNode<T>(incomingArray.shift() as T, previousNode);
  return addAdditionalNodes<T>(incomingArray, node);
}
