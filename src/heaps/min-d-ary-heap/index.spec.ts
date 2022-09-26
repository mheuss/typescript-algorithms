import { Comparisons } from "../../comparisons/constants";
import { MinDAryHeap } from "./index";

describe("Max Binary Heap Test", () => {
  it("Should initialize with a Comparisons.GreaterThan", () => {
    const heap = new MinDAryHeap({ maxNumberOfChildren: 3 });
    // @ts-expect-error Not worrying about types in unit test
    expect(heap.minOrMax).toEqual(Comparisons.LessThan);
  });
});
