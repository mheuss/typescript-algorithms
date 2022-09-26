import { divideArrayIntoColumns } from "./divideArrayIntoColumns";

describe("Test of divideArrayIntoParts", () => {
  it("Should properly divide into 2 parts if even", () => {
    const testArray = ["This", "Is", "A", "Test", "Of", "An", "Even", "Array"];

    const results = divideArrayIntoColumns(testArray, 2);
    expect(results).toEqual([
      ["This", "Is", "A", "Test"],
      ["Of", "An", "Even", "Array"],
    ]);
  });

  it("Should properly divide into 2 parts if uneven", () => {
    const testArray = [
      "This",
      "Is",
      "A",
      "Test",
      "Of",
      "An",
      "Uneven",
      "Array",
      "so...",
    ];

    const results = divideArrayIntoColumns(testArray, 2);
    expect(results).toEqual([
      ["This", "Is", "A", "Test", "Of"],
      ["An", "Uneven", "Array", "so..."],
    ]);
  });

  it("Should divide into three parts equally", () => {
    const testArray = [
      "This",
      "Is",
      "A",
      "Test",
      "Of",
      "An",
      "Uneven",
      "Array",
      "so...",
    ];

    const results = divideArrayIntoColumns(testArray, 3);
    expect(results).toEqual([
      ["This", "Is", "A"],
      ["Test", "Of", "An"],
      ["Uneven", "Array", "so..."],
    ]);
  });

  it("Should divide into three parts if unequal", () => {
    const testArray = [
      "This",
      "Is",
      "A",
      "Test",
      "Of",
      "An",
      "Uneven",
      "Array",
      "so...",
      "careful",
    ];

    const results = divideArrayIntoColumns(testArray, 3);
    expect(results).toEqual([
      ["This", "Is", "A", "Test"],
      ["Of", "An", "Uneven"],
      ["Array", "so...", "careful"],
    ]);
  });

  it("Should return itself if given nothing to do", () => {
    const testArray = [
      "This",
      "Is",
      "A",
      "Test",
      "Of",
      "An",
      "Uneven",
      "Array",
      "so...",
      "careful",
    ];

    const results = divideArrayIntoColumns(testArray, -3);
    expect(results).toEqual([testArray]);
  });
});
