import { ErrorCodes } from "../../constants";
import { InsertionSort } from "./index";

describe("Insertion sort", () => {
  it("Should sort an array of numbers quite readily", () => {
    const arr: number[] = [5, 2, 8, 6, 1, 3, 7, 9, 4, 10];
    const results = InsertionSort<number>(arr);
    expect(results.length).toEqual(arr.length);
    expect(results).toMatchSnapshot();
  });

  it("Should tackle an array of strings", () => {
    const arr: string[] = [
      "pineapple",
      "artichoke",
      "celery",
      "eggplant",
      "banana",
      "Kiwi",
    ];
    const results = InsertionSort<string>(arr);
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
    const results = InsertionSort<INames>(arr, (a: INames, b: INames) => {
      return a.lastName.localeCompare(b.lastName);
    });
    expect(results.length).toEqual(arr.length);
    expect(results).toMatchSnapshot();
  });

  it("Should return an empty array if given an empty array", () => {
    const results = InsertionSort<number>([]);
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
      InsertionSort(arr);
      fail("Should have thrown");
    } catch (e) {
      // @ts-expect-error - Not worried about getting the correct type here.
      expect(e.code).toEqual(ErrorCodes.COMPARISON_FUNCTION_REQUIRED);
    }
  });
});
