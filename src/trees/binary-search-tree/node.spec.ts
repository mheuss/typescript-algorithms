import { Sides } from "./constants";
import { Node } from "./node";

describe("Binary Tree Node Unit test", () => {
  it("Should properly create a node", () => {
    const node = new Node<number>(8);
    expect(node.value).toEqual(8);
    expect(node.children[Sides.Left]).toBeUndefined();
    expect(node.children[Sides.Right]).toBeUndefined();
  });

  it("Should set the parent, if passed in with the constructor", () => {
    const root = new Node<number>(8);
    const child = new Node<number>(4, root);
    expect(child.parent).toEqual(root);
  });
});
