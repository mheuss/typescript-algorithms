import { heapSort } from "./index";

describe("Heap Sort", () => {
  it("Should return a set of sorted integers", () => {
    const results = heapSort<number>([
      6, 3, 8, 10, 12, 65, 78, 123, 564, 785, 1234, 6543, 768, 5, 3, 1, 0,
    ]);
    expect(results).toEqual([
      0, 1, 3, 3, 5, 6, 8, 10, 12, 65, 78, 123, 564, 768, 785, 1234, 6543,
    ]);
  });

  it("Should return a set of sorted strings", () => {
    const results = heapSort<string>([
      "rob",
      "adam",
      "ben",
      "mark",
      "mike",
      "paul",
      "sonny",
      "mike",
      "frank",
    ]);
    expect(results).toEqual([
      "adam",
      "ben",
      "frank",
      "mark",
      "mike",
      "mike",
      "paul",
      "rob",
      "sonny",
    ]);
  });
});
