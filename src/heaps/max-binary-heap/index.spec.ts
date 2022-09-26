import { MaxBinaryHeap } from "./index";
const DATA = "data";

describe("Max Binary Heap Test", () => {
  it("Should Push three items into the list, and have them properly sorted", () => {
    const heap = new MaxBinaryHeap<number>();
    heap.push(10);
    heap.push(20);
    heap.push(30);
    expect(heap[DATA]).toEqual([30, 10, 20]);
  });
});
