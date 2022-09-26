import { ErrorCodes } from "../../constants";
import { MergeSort } from "./index";

describe("Merge Sort tests", () => {
  it("Should properly sort a list of numbers", () => {
    expect(MergeSort<number>([76, 23, 97, 12, 54, 5, 0, -1, 2])).toEqual([
      -1, 0, 2, 5, 12, 23, 54, 76, 97,
    ]);
  });

  it("Should properly sort a list of strings", () => {
    expect(
      MergeSort<string>([
        "pineapple",
        "artichoke",
        "celery",
        "eggplant",
        "banana",
        "Kiwi",
      ])
    ).toMatchSnapshot();
  });

  it("Should properly sort objects in reverse order", () => {
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
    const results = MergeSort<INames>(arr, (a: INames, b: INames) => {
      return a.lastName.localeCompare(b.lastName) * -1;
    });
    expect(results.length).toEqual(arr.length);
    expect(results).toMatchSnapshot();
  });

  it("Should return an empty array if given an empty array", () => {
    const results = MergeSort<number>([]);
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
      MergeSort(arr);
      fail("Should have thrown");
    } catch (e) {
      // @ts-expect-error Not worrying about types in unit test
      expect(e.code).toEqual(ErrorCodes.COMPARISON_FUNCTION_REQUIRED);
    }
  });
});
