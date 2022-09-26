import { MinBinaryHeap } from "./index";

describe("Max Binary Heap Test", () => {
  it("Should Push three items into the list, and have them properly sorted", () => {
    const DATA = "data";
    const heap = new MinBinaryHeap<number>();
    heap.push(10);
    heap.push(20);
    heap.push(30);
    expect(heap[DATA]).toEqual([10, 20, 30]);
  });
});
