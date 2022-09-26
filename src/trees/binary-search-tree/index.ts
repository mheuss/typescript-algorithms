import { ComparisonFunction, Comparisons } from "../../comparisons/constants";
import { GenericTree } from "../base";
import { Sides } from "./constants";
import { Node } from "./node";

/**
 * Binary search tree implementation.
 */
export class BinarySearchTree<T> extends GenericTree<T> {
  private static recursiveFind<T>(
    node: Node<T>,
    incomingValue: T,
    comparisonFunction: ComparisonFunction<T>
  ): Node<T> | null {
    const comparison = comparisonFunction(incomingValue, node.value);

    switch (comparison) {
      case Comparisons.GreaterThan:
        if (node.children[Sides.Right] === undefined) {
          return null;
        }
        return BinarySearchTree.recursiveFind(
          node.children[Sides.Right],
          incomingValue,
          comparisonFunction
        );
      default:
      case Comparisons.Equal:
        return node;
      case Comparisons.LessThan:
        if (node.children[Sides.Left] === undefined) {
          return null;
        }
        return BinarySearchTree.recursiveFind(
          node.children[Sides.Left],
          incomingValue,
          comparisonFunction
        );
    }
  }

  private static recursiveComparison<T>(
    node: Node<T>,
    incomingValue: T,
    comparisonFunction: ComparisonFunction<T>
  ): Node<T> | null {
    const comparison = comparisonFunction(incomingValue, node.value);

    switch (comparison) {
      case Comparisons.GreaterThan:
        if (node.children[Sides.Right] === undefined) {
          node.children[Sides.Right] = new Node(incomingValue, node);
          return node.children[Sides.Right];
        }
        return BinarySearchTree.recursiveComparison(
          node.children[Sides.Right],
          incomingValue,
          comparisonFunction
        );
      default:
      case Comparisons.Equal:
        return null;
      case Comparisons.LessThan:
        if (node.children[Sides.Left] === undefined) {
          node.children[Sides.Left] = new Node(incomingValue, node);
          return node.children[Sides.Left];
        }
        return BinarySearchTree.recursiveComparison(
          node.children[Sides.Left],
          incomingValue,
          comparisonFunction
        );
    }
  }

  constructor(comparisonFunction?: ComparisonFunction<T>) {
    super({
      comparisonFunction,
      numberOfAllowedChildrenPerNode: 2,
    });
  }

  /**
   * Will insert a node into the proper place in a tree
   * @param incomingValue
   * @returns {BinarySearchTree} Current Instance
   */
  public insert = (incomingValue: T): BinarySearchTree<T> => {
    if (this.comparisonFunction === undefined) {
      this.comparisonFunction =
        BinarySearchTree.SelectComparisonFunction<T>(incomingValue);
    }

    if (this.root === null) {
      this.root = new Node(incomingValue);
      this.nodeCount = 1;
      return this;
    }

    const returnValue = BinarySearchTree.recursiveComparison<T>(
      this.root,
      incomingValue,
      this.comparisonFunction
    );
    if (returnValue) {
      this.nodeCount++;
    }

    return this;
  };

  /**
   * Will find a node with a given value in the tree
   * @param target Value to find
   * @returns boolean
   */
  public find = (target: T): boolean => {
    return this.findNode(target) !== null;
  };

  protected findNode = (target: T): Node<T> | null => {
    if (target === null || target === undefined || this.root === null) {
      return null;
    }

    if (this.comparisonFunction === undefined) {
      this.comparisonFunction =
        BinarySearchTree.SelectComparisonFunction<T>(target);
    }

    return BinarySearchTree.recursiveFind<T>(
      this.root,
      target,
      this.comparisonFunction
    );
  };

  // @todo Implement Delete https://www.geeksforgeeks.org/binary-search-tree-set-2-delete/
}
