import { ComparisonFunction } from '../comparisons/constants';
import { numericComparison } from '../comparisons/numbers';
import { stringComparison } from '../comparisons/strings';
import { ErrorCodes } from '../constants';
import { Queue } from '../queues/fifo-queue';
import { Node } from './binary-search-tree/node';
import { ITreeObject, Traversal } from './constants';

interface IGenericTreeParams<T> {
  comparisonFunction?: ComparisonFunction<T>;
  numberOfAllowedChildrenPerNode?: number;
  initializeWithDataFile?: ITreeObject<T>;
}

export class GenericTree<T> {
  protected static SelectComparisonFunction<T>(
    incomingValue: T
  ): ComparisonFunction<T> {
    if (typeof incomingValue === 'string' || incomingValue instanceof String) {
      // @ts-ignore
      return stringComparison;
    } else if (typeof incomingValue === 'number') {
      // @ts-ignore
      return numericComparison;
    } else {
      throw {
        code: ErrorCodes.COMPARISON_FUNCTION_REQUIRED,
        message:
          'A custom comparison function is needed for arrays of types other than string or numbers',
      };
    }
  }

  protected root: Node<T> | null = null;
  protected nodeCount: number = 0;
  protected comparisonFunction: ComparisonFunction<T> | undefined;
  protected maxNumberOfChildrenPerNode: number | undefined;

  constructor(options?: IGenericTreeParams<T>) {
    this.clear();
    this.comparisonFunction = options ? options.comparisonFunction : undefined;
    if (
      options?.numberOfAllowedChildrenPerNode &&
      options.numberOfAllowedChildrenPerNode > 1
    ) {
      this.maxNumberOfChildrenPerNode = options.numberOfAllowedChildrenPerNode;
    }
    if (options?.initializeWithDataFile) {
      this.loadTreeFromObject(options?.initializeWithDataFile);
    }
  }

  /**
   * Destroys the tree. Keeps the comparison function and the maxNumberOfChildren
   */
  public clear = () => {
    this.root = null;
    this.nodeCount = 0;
  };

  /**
   * Returns the total number of nodes in the search tree.
   * @returns {number}
   */
  public getNodeCount = () => {
    return this.nodeCount;
  };

  /**
   * Returns the maximum number of children each node can have.
   */
  public getMaxNumberOfChildren = () => {
    return this.maxNumberOfChildrenPerNode;
  };

  /**
   * Loads tree data into the tree
   * @param {ITreeObject} dataFile representing the tree.
   */
  public loadTreeFromObject = (dataFile: ITreeObject<T>): void => {
    if (!dataFile || !dataFile.value) {
      throw {
        code: ErrorCodes.INVALID_TREE_DATA_FILE,
        message: 'Invalid structure passed into load',
      };
    }

    this.clear();
    this.nodeCount = 1;
    this.root = this.createLoadedNode(null, dataFile);
  };

  public saveTreeFromObject = (): ITreeObject<T> | undefined => {
    if (this.root === null) {
      return undefined;
    }

    return this.createTreeAsObject(this.root);
  };

  public traverse = (order: Traversal, operation: (item: Node<T>) => void) => {
    if (this.root === null || this.root === undefined) {
      return [];
    }

    switch (order) {
      case Traversal.Breadth_First:
        return this.traversalBreadthFirst(this.root, operation);
      case Traversal.DepthFirstInOrder:
        return this.traversalDepthFirstInOrder(this.root, operation);
      case Traversal.DepthFirstPostOrder:
        return this.traversalDepthFirstPostOrder(this.root, operation);
      case Traversal.DepthFirstPreOrder:
        return this.traversalDepthFirstPreOrder(this.root, operation);
    }
  };

  protected traversalBreadthFirst(
    startingNode: Node<T>,
    operation: (item: Node<T>) => void
  ) {
    const queue = new Queue<Node<T>>();
    queue.enqueue(startingNode);

    do {
      const node = queue.dequeue();
      if (node) {
        operation(node);

        node.children.forEach(child => {
          queue.enqueue(child);
        });
      }
    } while (queue.length() !== 0);
  }

  protected traversalDepthFirstPreOrder = (
    startingNode: Node<T>,
    operation: (item: Node<T>) => void
  ) => {
    operation(startingNode);
    startingNode.children.forEach(child => {
      if (child) {
        this.traversalDepthFirstPreOrder(child, operation);
      }
    });
  };

  protected traversalDepthFirstPostOrder = (
    startingNode: Node<T>,
    operation: (item: Node<T>) => void
  ) => {
    startingNode.children.forEach(child => {
      if (child) {
        this.traversalDepthFirstPostOrder(child, operation);
      }
    });
    operation(startingNode);
  };

  protected traversalDepthFirstInOrder = (
    startingNode: Node<T>,
    operation: (item: Node<T>) => void
  ) => {
    operation(startingNode);

    this.inOrderHelper(startingNode, operation);
  };

  private inOrderHelper = (
    startingNode: Node<T>,
    operation: (item: Node<T>) => void
  ) => {
    startingNode.children.forEach(child => {
      this.inOrderHelper(child, operation);
      operation(child);
    });
  };

  private createTreeAsObject = (node: Node<T>): ITreeObject<T> => {
    const treeToReturn = {
      children: [] as Array<ITreeObject<T>>,
      value: node.value,
    };

    node.children.forEach(item => {
      treeToReturn.children.push(this.createTreeAsObject(item));
    });

    return treeToReturn;
  };

  private createLoadedNode = (
    parent: Node<T> | null,
    dataFile: ITreeObject<T>
  ) => {
    const node = new Node<T>(dataFile.value, parent);

    dataFile.children.forEach(child => {
      node.children.push(this.createLoadedNode(node, child));
      this.nodeCount++;
    });

    return node;
  };
}
