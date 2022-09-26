/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorCodes } from "../../constants";
import { DoublyLinkedList } from "./index";

const HEAD = "head";
const TAIL = "tail";
const FIND_ITEM = "getNode";

describe("Test of Double Linked List", () => {
  describe("Get Node Tests", () => {
    it("Should return first item, if first item is requested", () => {
      const list = new DoublyLinkedList<number>();
      list.pushArray([1, 2, 3, 4, 5, 6, 7]);
      // @ts-expect-error Not worrying about types in unit test
      expect(list[FIND_ITEM](0).payload).toEqual(1);
    });

    it("Should return the last item, if that is what is requested", () => {
      const list = new DoublyLinkedList<number>();
      list.pushArray([1, 2, 3, 4, 5, 6, 7]);
      // @ts-expect-error Not worrying about types in unit test
      expect(list[FIND_ITEM](6).payload).toEqual(7);
    });
  });

  describe("findLast", () => {
    it("Should return undefined with empty list", () => {
      const list = new DoublyLinkedList<number>();
      expect(list.findLast((value) => value === 7)).toBeUndefined();
    });

    it("Should return undefined if it can't find nuffin", () => {
      const list = new DoublyLinkedList<number>();
      list.pushArray([1, 2, 3, 4, 5, 6, 7]);
      expect(list.findLast((value) => value === 32)).toBeUndefined();
    });

    it("Should return value if it matches - string", () => {
      const list = new DoublyLinkedList<string>();
      list.pushArray(["apple", "pear", "orange", "banana"]);
      expect(list.findLast((value) => value === "pear")).toMatchObject({
        index: 1,
        value: "pear",
      });
    });

    it("should return value if it matches, object", () => {
      const list = new DoublyLinkedList<any>();
      list.pushArray([
        { firstName: "Mike" },
        { firstName: "Bob" },
        { firstName: "Jim" },
        { firstName: "Ahtasham" },
        { firstName: "Nigel" },
      ]);
      expect(list.findLast((value) => value.firstName === "Jim")).toMatchObject(
        {
          index: 2,
          value: { firstName: "Jim" },
        }
      );
    });

    it("Should return value if it matches, number, end of list", () => {
      const list = new DoublyLinkedList<number>();
      list.pushArray([1, 2, 3, 4, 5, 6, 7]);
      expect(list.findLast((value) => value === 7)).toMatchObject({
        index: 6,
        value: 7,
      });
    });

    it("Should return value if it matches, proof that it is going from back to front", () => {
      const list = new DoublyLinkedList<number>();
      list.pushArray([1, 2, 3, 4, 5, 6, 7]);
      expect(list.findLast((value) => value % 2 === 0)).toMatchObject({
        index: 5,
        value: 6,
      });
    });

    it("Should return value if it matches, number, beginning of list", () => {
      const list = new DoublyLinkedList<number>();
      list.pushArray([1, 2, 3, 4, 5, 6, 7]);
      expect(list.findLast((value) => value === 1)).toMatchObject({
        index: 0,
        value: 1,
      });
    });
  });

  describe("UnShift", () => {
    it("Should be able to unshift an item onto an empty list", () => {
      const list = new DoublyLinkedList<number>();
      list.unshift(3);

      expect(list.getLength()).toEqual(1);
      expect(list[HEAD]?.payload).toEqual(3);
      expect(list[TAIL]?.payload).toEqual(3);
    });

    it("Should be able to unshift an item onto a populated list", () => {
      const list = new DoublyLinkedList<number>();
      list.pushArray([2, 3, 4]);
      list.unshift(1);

      expect(list.getLength()).toEqual(4);
      expect(list[HEAD]?.payload).toEqual(1);
      expect(list[TAIL]?.payload).toEqual(4);
      expect(list[HEAD]?.previous).toBeNull();
      // @ts-expect-error Not worrying about types in unit test
      expect(list[HEAD]?.next.previous).toEqual(list[HEAD]);
    });
  });

  describe("Shift", () => {
    it("Should return undefined for empty list", () => {
      const list = new DoublyLinkedList<number>();
      const node = list.shift();
      expect(node).toBeUndefined();
    });

    it("Should value for list of one item", () => {
      const list = new DoublyLinkedList<number>();
      list.push(6);
      const value = list.shift();
      expect(value).toEqual(6);
      expect(list.getLength()).toEqual(0);
      expect(list[HEAD]).toBeNull();
      expect(list[TAIL]).toBeNull();
    });

    it("Should shift off a list of many items", () => {
      const list = new DoublyLinkedList<number>();
      list.pushArray([1, 2, 3, 4, 5, 6, 7]);
      const value = list.shift();
      expect(value).toEqual(1);
      expect(list.getLength()).toEqual(6);
      expect(list[HEAD]?.payload).toEqual(2);
      expect(list[TAIL]?.payload).toEqual(7);
      // @ts-expect-error Not worrying about types in unit test

      expect(list[HEAD].previous).toBeNull();
    });
  });

  describe("Test of Push", () => {
    it("Should add to list", () => {
      const list = new DoublyLinkedList<number>();
      list.push(1);
      expect(list[HEAD]).toMatchSnapshot();
      expect(list.getLength()).toEqual(1);
    });

    it("Should add to list", () => {
      const list = new DoublyLinkedList<number>();
      list.push(1).push(2).push(3);
      expect(list[HEAD]).toMatchSnapshot();
      expect(list.getLength()).toEqual(3);
    });

    it("Should push an array", () => {
      const list = new DoublyLinkedList<number>();
      list.pushArray([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(list[HEAD]).toMatchSnapshot();
      expect(list.getLength()).toEqual(8);
      expect(list.toArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });
  });

  describe("POP", () => {
    it("Should return a undefined with an empty list", () => {
      const list = new DoublyLinkedList<number>();
      const node = list.pop();
      expect(node).toBeUndefined();
    });

    it("Should empty list and return item payload if there is only 1 item in the list", () => {
      const list = new DoublyLinkedList<string>();
      const payload = "apple";
      list.push(payload);
      const value = list.pop();
      expect(value).toEqual(payload);
      expect(list.getLength()).toEqual(0);
      expect(list[HEAD]).toBeNull();
      expect(list[TAIL]).toBeNull();
    });

    it("Should return undefined if underlying find returns a null", () => {
      const list = new DoublyLinkedList<string>();
      list.pushArray(["apple", "pear", "orange", "banana"]);
      // @ts-expect-error Not worrying about types in unit test

      list[TAIL].previous = null;
      try {
        list.pop();
        fail("Should have thrown");
      } catch (e) {
        // @ts-expect-error Not worrying about types in unit test

        expect(e.code).toEqual(ErrorCodes.LIST_IS_BROKEN_INTERNALLY);
      }
    });

    it("Should pop requested item", () => {
      const list = new DoublyLinkedList<string>();
      list.pushArray(["apple", "pear", "orange", "banana"]);
      const value = list.pop();
      expect(value).toEqual("banana");
      expect(list.getLength()).toEqual(3);
      expect(list[TAIL]?.payload).toEqual("orange");
    });
  });

  describe("Reverse", () => {
    it("Should do nothing is the list contains 1 or less items", () => {
      const list = new DoublyLinkedList<number>();
      list.push(1);
      expect(list.reverse().toArray()).toEqual([1]);
    });

    it("Should reverse the list", () => {
      const list = new DoublyLinkedList<number>();
      list.pushArray([1, 2, 3]);
      expect(list.reverse().toArray()).toEqual([3, 2, 1]);
    });
  });

  describe("Insert", () => {
    it("Should throw if we attempt to insert out of bounds", () => {
      try {
        const list = new DoublyLinkedList<number>();
        list.insert(14, 6);
        fail("Should have thrown since the index is out of bounds");
      } catch (e) {
        // @ts-expect-error Not worrying about types in unit test

        expect(e.code).toEqual(ErrorCodes.LIST_IS_BROKEN_INTERNALLY);
      }
    });

    it("Should insert a node in the beginning if the list length was zero", () => {
      const list = new DoublyLinkedList<number>();
      list.insert(0, 6);
      expect(list.getLength()).toEqual(1);
      expect(list.toArray()).toMatchSnapshot();
    });

    it("Should throw if getNode returns bad data", () => {
      const list = new DoublyLinkedList<number>();
      const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 10];
      list.pushArray(arr);
      list[FIND_ITEM] = jest.fn().mockReturnValue(null);

      try {
        list.insert(4, 6);
        fail("Should have thrown since the index is out of bounds");
      } catch (e) {
        // @ts-expect-error Not worrying about types in unit test

        expect(e.code).toEqual(ErrorCodes.OPERATION_BEYOND_BOUNDS);
      }
    });

    it("Should insert a node at the end", () => {
      const list = new DoublyLinkedList<number>();
      const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      list.pushArray(arr);
      list.insert(9, 10);
      expect(list.getLength()).toEqual(10);
      expect(list.toArray()).toMatchSnapshot();
    });

    it("Should insert a node in the middle", () => {
      const list = new DoublyLinkedList<number>();
      const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 10];
      list.pushArray(arr);
      list.insert(8, 9);
      expect(list.getLength()).toEqual(10);
      expect(list.toArray()).toMatchSnapshot();
    });
  });

  describe("Remove", () => {
    it("Should remove an item from the beginning of the list", () => {
      const list = new DoublyLinkedList<number>();
      const arr: number[] = [1, 2, 3];
      list.pushArray(arr);

      expect(list.remove(0)).toEqual(1);
      expect(list.getLength()).toEqual(2);
      expect(list.toArray()).toEqual([2, 3]);
    });

    it("Should remove an item from the end of the list", () => {
      const list = new DoublyLinkedList<number>();
      const arr: number[] = [1, 2, 3];
      list.pushArray(arr);

      expect(list.remove(2)).toEqual(3);
      expect(list.getLength()).toEqual(2);
      expect(list.toArray()).toEqual([1, 2]);
    });

    it("Should remove an item from the middle of the list", () => {
      const list = new DoublyLinkedList<number>();
      const arr: number[] = [1, 2, 3];
      list.pushArray(arr);

      expect(list.remove(1)).toEqual(2);
      expect(list.getLength()).toEqual(2);
      expect(list.toArray()).toEqual([1, 3]);
    });

    it("Should throw if passed in a negative number", () => {
      const list = new DoublyLinkedList<number>();
      const arr: number[] = [1, 2, 3];
      list.pushArray(arr);

      try {
        list.remove(-1);
        fail("Should have thrown, baby");
      } catch (e) {
        // @ts-expect-error Not worrying about types in unit test

        expect(e.code).toEqual(ErrorCodes.OPERATION_BEYOND_BOUNDS);
      }
    });

    it("Should throw if passed in too large number", () => {
      const list = new DoublyLinkedList<number>();
      const arr: number[] = [1, 2, 3];
      list.pushArray(arr);

      try {
        list.remove(100);
        fail("Should have thrown, baby");
      } catch (e) {
        // @ts-expect-error Not worrying about types in unit test

        expect(e.code).toEqual(ErrorCodes.OPERATION_BEYOND_BOUNDS);
      }
    });

    it("Should throw on an empty list", () => {
      const list = new DoublyLinkedList<number>();

      try {
        list.remove(-1);
        fail("Should have thrown. No items in list");
      } catch (e) {
        // @ts-expect-error Not worrying about types in unit test

        expect(e.code).toEqual(ErrorCodes.OPERATION_BEYOND_BOUNDS);
      }
    });
  });
});
