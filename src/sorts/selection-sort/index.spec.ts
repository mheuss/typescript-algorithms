import { ErrorCodes } from "../../constants";
import { SelectionSort } from "./index";

describe("Selection sort", () => {
  it("Should sort an array of numbers quite readily", () => {
    const arr: number[] = [5, 2, 8, 6, 1, 3, 7, 9, 4, 10];
    const results = SelectionSort<number>(arr);
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
    const results = SelectionSort<string>(arr);
    expect(results.length).toEqual(arr.length);
    expect(results).toMatchSnapshot();
  });

  it("Should be able to support an array of objects using a custom sort - this is sorting by last name in reverse order", () => {
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
    const results = SelectionSort<INames>(arr, (a: INames, b: INames) => {
      return a.lastName.localeCompare(b.lastName) * -1;
    });
    expect(results.length).toEqual(arr.length);
    expect(results).toMatchSnapshot();
  });

  it("Should return an empty array if given an empty array", () => {
    const results = SelectionSort<number>([]);
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
      SelectionSort(arr);
      fail("Should have thrown");
    } catch (e) {
      // @ts-expect-error Not worrying about types in unit test
      expect(e.code).toEqual(ErrorCodes.COMPARISON_FUNCTION_REQUIRED);
    }
  });
});
