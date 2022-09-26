import { ErrorCodes } from "../../constants";
import { BubbleSort } from "./index";

describe("Bubble Sort Tests", () => {
  it("Should be able to sort a list of numbers in order", () => {
    const arr = [5, 2, 8, 67, 2, 5, 7, 4, 1, 7, 4, 67, 8, 9, 3];
    const results = BubbleSort<number>(arr);
    expect(results.length).toEqual(arr.length);
    expect(results).toMatchSnapshot();
  });

  it("Should be able to sort strings in correct order", () => {
    const arr = [
      "Michael",
      "Constance",
      "Mikey",
      "Lauren",
      "not a first name",
      "note",
    ];
    const results = BubbleSort<string>(arr);
    expect(results.length).toEqual(arr.length);
    expect(results).toMatchSnapshot();
  });

  it("Should be able to support an array of objects using a custom sort", () => {
    interface INames {
      lastName: string;
      firstName: string;
    }

    const arr = [
      { lastName: "Heuss", firstName: "Mike" },
      { lastName: "Smith", firstName: "John" },
      { lastName: "Arnold", firstName: "Peggy" },
      { lastName: "Saben", firstName: "Matt" },
      { lastName: "LaCroix", firstName: "Mark" },
    ];
    const results = BubbleSort<INames>(arr, (a: INames, b: INames) => {
      return a.lastName.localeCompare(b.lastName);
    });
    expect(results.length).toEqual(arr.length);
    expect(results).toMatchSnapshot();
  });

  it("Should return an empty array if given an empty array", () => {
    const results = BubbleSort<number>([]);
    expect(results).toEqual([]);
  });

  it("Should throw if array is of type it cannot sort, and no sort function was passed in", () => {
    const arr = [
      { lastName: "Heuss", firstName: "Mike" },
      { lastName: "Smith", firstName: "John" },
      { lastName: "Arnold", firstName: "Peggy" },
      { lastName: "Saben", firstName: "Matt" },
      { lastName: "LaCroix", firstName: "Mark" },
    ];
    try {
      BubbleSort(arr);
      fail("Should have thrown");
    } catch (e) {
      // @ts-expect-error Not worrying about types in unit test
      expect(e.code).toEqual(ErrorCodes.COMPARISON_FUNCTION_REQUIRED);
    }
  });
});
