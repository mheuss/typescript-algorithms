/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import { Sides } from "./constants";
import { BinarySearchTree } from "./index";

const ROOT = "root";

interface ITestObject {
  payload: number;
}

describe("Binary Search Tree Unit tests", () => {
  describe("Numeric Tests", () => {
    const tree = new BinarySearchTree<number>();

    describe("Insert Tests", () => {
      it("Should succesfully insert a node at the root level if none exist", () => {
        tree.insert(3);

        expect(tree.getNodeCount()).toEqual(1);
        expect(tree[ROOT]!.value).toEqual(3);
        expect(tree[ROOT]!.children[Sides.Left]).toBeUndefined();
        expect(tree[ROOT]!.children[Sides.Right]).toBeUndefined();
      });

      it("Should insert a greater number to the right", () => {
        tree.insert(4);
        expect(tree.getNodeCount()).toEqual(2);
        expect(tree[ROOT]!.children[Sides.Left]).toBeUndefined();
        expect(tree[ROOT]!.children[Sides.Right]!.value).toEqual(4);
        expect(tree[ROOT]!.children[Sides.Right]!.parent).toEqual(tree[ROOT]);
      });

      it("Should insert a lesser number to the left", () => {
        tree.insert(2);
        expect(tree.getNodeCount()).toEqual(3);
        expect(tree[ROOT]!.children[Sides.Left]!.value).toEqual(2);
        expect(tree[ROOT]!.children[Sides.Right]!.value).toEqual(4);
      });

      it("Should change nuffin with an equals too", () => {
        tree.insert(2);
        expect(tree.getNodeCount()).toEqual(3);
      });

      it("Snapshot", () => {
        tree.insert(2);
        tree.insert(15);
        tree.insert(35);
        tree.insert(17);

        expect(tree[ROOT]).toMatchSnapshot();
      });
    });

    describe("Find tests", () => {
      it("Should return false for bad data ", () => {
        // @ts-expect-error Purposely passing in bad data
        expect(tree.find(null)).toBeFalsy();
      });

      it("Should find a value on the left", () => {
        expect(tree.find(15)).toBeTruthy();
      });

      it("Should find value on the right", () => {
        expect(tree.find(2)).toBeTruthy();
      });

      it("Should find root value", () => {
        expect(tree.find(3)).toBeTruthy();
      });

      it("Should not find values that do not exist on the left", () => {
        expect(tree.find(-1)).toBeFalsy();
      });

      it("Should not find values that do not exist on the right", () => {
        expect(tree.find(32767)).toBeFalsy();
      });
    });
  });

  describe("Test with strings", () => {
    const tree = new BinarySearchTree<string>();
    describe("Insert Tests", () => {
      it("Should succesfully insert a node at the root level if none exist", () => {
        tree.insert("Mike");

        expect(tree.getNodeCount()).toEqual(1);
        expect(tree[ROOT]!.value).toEqual("Mike");
        expect(tree[ROOT]!.children[Sides.Left]).toBeUndefined();
        expect(tree[ROOT]!.children[Sides.Right]).toBeUndefined();
      });

      it("Should insert a greater number to the right", () => {
        tree.insert("Nancy");
        expect(tree.getNodeCount()).toEqual(2);
        expect(tree[ROOT]!.children[Sides.Left]).toBeUndefined();
        expect(tree[ROOT]!.children[Sides.Right]!.value).toEqual("Nancy");
      });

      it("Should insert a lesser number to the left", () => {
        tree.insert("Bravo");
        expect(tree.getNodeCount()).toEqual(3);
        expect(tree[ROOT]!.children[Sides.Left]!.value).toEqual("Bravo");
        expect(tree[ROOT]!.children[Sides.Right]!.value).toEqual("Nancy");
      });

      it("Should change nuffin with an equals too", () => {
        tree.insert("Bravo");
        expect(tree.getNodeCount()).toEqual(3);
      });

      it("Snapshot", () => {
        tree.insert("Bravo");
        tree.insert("Oscar");
        tree.insert("Zulu");
        tree.insert("Papa");

        expect(tree[ROOT]).toMatchSnapshot();
      });
    });

    describe("Find tests", () => {
      it("Should find a value on the left", () => {
        expect(tree.find("Bravo")).toBeTruthy();
      });

      it("Should find value on the right", () => {
        expect(tree.find("Oscar")).toBeTruthy();
      });

      it("Should find root value", () => {
        expect(tree.find("Mike")).toBeTruthy();
      });

      it("Should not find values that do not exist on the left", () => {
        expect(tree.find("Charlie")).toBeFalsy();
      });

      it("Should not find values that do not exist on the right", () => {
        expect(tree.find("Whiskey")).toBeFalsy();
      });
    });
  });

  describe("Test with Objects", () => {
    const tree = new BinarySearchTree<ITestObject>();
    it("Should fail a find when no comparator is present", () => {
      const MAHROOT = "root";
      // @ts-expect-error Using a unit test, don't care about proper type here
      tree[MAHROOT] = { some: "test" };
      expect(() => {
        tree.find({ payload: 34 });
      }).toThrowErrorMatchingSnapshot();
    });
  });
});
