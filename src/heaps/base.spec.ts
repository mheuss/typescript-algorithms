import { Comparisons } from "../comparisons/constants";
import { BaseHeap } from "./base";
import { IBaseHeapParameters } from "./types";

const DATA = "data";

describe("Base Heap Unit Tests - Max", () => {
  const numberOptions: IBaseHeapParameters<number> = {
    maxNumberOfChildren: 2,
    minOrMax: Comparisons.GreaterThan,
  };
  const stringOptions: IBaseHeapParameters<string> = {
    maxNumberOfChildren: 2,
    minOrMax: Comparisons.GreaterThan,
  };
  describe("Push", () => {
    it("Should Push a single item into the list", () => {
      const heap = new BaseHeap<number>(numberOptions);
      heap.push(10);
      expect(heap[DATA]).toEqual([10]);
    });

    it("Should Push three items into the list, and have them properly sorted", () => {
      const heap = new BaseHeap<number>(numberOptions);
      heap.push(10);
      heap.push(20);
      heap.push(30);
      expect(heap[DATA]).toEqual([30, 10, 20]);
    });

    it("Should Push more items into the list, and have them properly sorted", () => {
      const heap = new BaseHeap<number>(numberOptions);
      heap.push(10);
      heap.push(20);
      heap.push(30);
      heap.push(35);
      heap.push(50);
      heap.push(75);
      heap.push(100);
      expect(heap[DATA]).toEqual([100, 35, 75, 10, 30, 20, 50]);
    });
  });

  describe("Push Array", () => {
    it("Should survive a push of an empty array", () => {
      const heap = new BaseHeap<number>(numberOptions);
      const testArray: number[] = [];
      heap.pushArray(testArray);
      expect(heap[DATA]).toEqual(testArray);
    });
  });

  describe("Pop", () => {
    it("Should return undefined if we are popping an item off an empty list", () => {
      const heap = new BaseHeap<number>(numberOptions);
      expect(heap.pop()).toBeUndefined();
    });

    it("Should select a comparison function if no comparison function has been selected", () => {
      const heap = new BaseHeap<number>(numberOptions);
      const spy = jest.spyOn(heap, "checkComparisonFunction" as never);

      heap.push(50);
      heap.push(10);

      expect(heap.pop()).toEqual(50);
      expect(spy).toBeCalled();
    });

    it("Should return a item and empty the list if we are popping of a list with the length of 1", () => {
      const heap = new BaseHeap<number>(numberOptions);
      heap.push(50);
      expect(heap.pop()).toEqual(50);
      expect(heap.getLength()).toEqual(0);
    });

    it("Should bubble down correctly with a small list of 2 items", () => {
      const heap = new BaseHeap<number>(numberOptions);
      heap.pushArray([50, 15]);
      expect(heap.pop()).toEqual(50);
      expect(heap[DATA]).toEqual([15]);
    });

    it("Should bubble down correctly with a larger list", () => {
      const heap = new BaseHeap<number>(numberOptions);
      heap.pushArray([50, 30, 20, 15, 17, 10, 7, 6, 8, 3, 2, 9, 4, 1, 5]);
      expect(heap.pop()).toEqual(50);
      expect(heap[DATA]).toEqual([
        30, 17, 20, 15, 5, 10, 7, 6, 8, 3, 2, 9, 4, 1,
      ]);
    });
  });

  describe("Let us try same operations with strings", () => {
    const heap = new BaseHeap<string>(stringOptions);
    it("should allow us to push items onto a list and order them", () => {
      heap.push("Mike");
      heap.push("Alan");
      heap.push("Robert");
      expect(heap[DATA]).toEqual(["Robert", "Alan", "Mike"]);
    });

    it("Should allow us to pop", () => {
      expect(heap.pop()).toEqual("Robert");
      expect(heap[DATA]).toEqual(["Mike", "Alan"]);
    });
  });

  describe("Bubble Down", () => {
    it("Should not throw if told to bubble down over an impossible number", () => {
      const heap = new BaseHeap<string>(stringOptions);
      heap.push("Mike");
      heap.push("Alan");
      const bubbleDown = "bubbleDown";
      try {
        heap[bubbleDown](-20);
        return;
      } catch (e) {
        fail("Should not have thrown");
      }
    });
  });
});

describe("Base Heap Unit Tests - Min", () => {
  const numberOptions: IBaseHeapParameters<number> = {
    maxNumberOfChildren: 2,
    minOrMax: Comparisons.LessThan,
  };
  const stringOptions: IBaseHeapParameters<string> = {
    maxNumberOfChildren: 2,
    minOrMax: Comparisons.LessThan,
  };
  describe("Push", () => {
    it("Should Push a single item into the list", () => {
      const heap = new BaseHeap<number>(numberOptions);
      heap.push(10);
      expect(heap[DATA]).toEqual([10]);
    });

    it("Should Push three items into the list, and have them properly sorted", () => {
      const heap = new BaseHeap<number>(numberOptions);
      heap.push(10);
      heap.push(20);
      heap.push(30);
      expect(heap[DATA]).toEqual([10, 20, 30]);
    });

    it("Should Push more items into the list, and have them properly sorted", () => {
      const heap = new BaseHeap<number>(numberOptions);
      heap.pushArray([100, 50, 20, 35, 40, 75, 225]);
      expect(heap[DATA]).toEqual([20, 35, 50, 100, 40, 75, 225]);
    });
  });

  describe("Pop", () => {
    it("Should bubble down correctly with a small list of 2 items", () => {
      const heap = new BaseHeap<number>(numberOptions);
      heap.pushArray([50, 15]);
      expect(heap.pop()).toEqual(15);
      expect(heap[DATA]).toEqual([50]);
    });

    it("Should bubble down correctly with a larger list", () => {
      const heap = new BaseHeap<number>(numberOptions);
      heap.pushArray([50, 30, 20, 15, 17, 10, 7, 6, 8, 3, 2, 9, 4, 1, 5]);
      expect(heap.pop()).toEqual(1);
      expect(heap[DATA]).toEqual([
        2, 3, 4, 8, 6, 9, 5, 50, 17, 20, 7, 30, 10, 15,
      ]);
    });
  });

  describe("Let us try same operations with strings", () => {
    const heap = new BaseHeap<string>(stringOptions);
    it("should allow us to push items onto a list and order them", () => {
      heap.push("Mike");
      heap.push("Alan");
      heap.push("Robert");
      expect(heap[DATA]).toEqual(["Alan", "Mike", "Robert"]);
    });

    it("Should allow us to pop", () => {
      expect(heap.pop()).toEqual("Alan");
      expect(heap[DATA]).toEqual(["Mike", "Robert"]);
    });
  });

  describe("get Queue and Empty", () => {
    const heap = new BaseHeap<number>(numberOptions);
    const target = [10, 30, 20];

    beforeAll(() => {
      heap.pushArray(target);
    });

    it("Should return the complete array", () => {
      expect(heap.getHeapContents()).toEqual(target);
    });

    it("Should clear the heap", () => {
      heap.empty();
      expect(heap.getLength()).toEqual(0);
    });
  });
});
