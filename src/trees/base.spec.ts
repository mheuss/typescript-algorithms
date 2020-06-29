import { numericComparison } from '../comparisons/numbers';
import { stringComparison } from '../comparisons/strings';
import { ErrorCodes } from '../constants';
import { GenericTree } from './base';
import { Node } from './binary-search-tree/node';
import { ITreeObject, Traversal } from './constants';

describe('Base Tree Unit tests', () => {
  it('Should return the count of nodes in a given tree', () => {
    const tree = new GenericTree<number>({ numberOfAllowedChildrenPerNode: 3 });
    expect(tree.getNodeCount()).toEqual(0);
    const NC = 'nodeCount';
    tree[NC] = 13;
    expect(tree.getNodeCount()).toEqual(13);
  });

  describe('Max kids per node', () => {
    it('Should tell us the maximum number of children each node can have', () => {
      const tree = new GenericTree<number>({
        numberOfAllowedChildrenPerNode: 3,
      });
      expect(tree.getMaxNumberOfChildren()).toEqual(3);
    });

    it('Should give us undefined, if undefined is what we pass in', () => {
      const tree = new GenericTree<number>({});
      expect(tree.getMaxNumberOfChildren()).toBeUndefined();
    });

    it('Should give us undefined, if an out of bounds number is passed in', () => {
      const tree = new GenericTree<number>({
        numberOfAllowedChildrenPerNode: -23,
      });
      expect(tree.getMaxNumberOfChildren()).toBeUndefined();
    });
  });

  describe('Load from data file in constructor', () => {
    it('Should load from data file if specific in constructor', () => {
      const tree = new GenericTree<number>({
        initializeWithDataFile: treeData,
      });
      expect(tree.getNodeCount()).toEqual(9);
    });

    it('Should throw if passed malarkey', () => {
      try {
        // tslint:disable-next-line:no-unused-expression
        new GenericTree<number>({
          initializeWithDataFile: { salad: 'yes please' } as any,
        });
        fail('Should not have got here');
      } catch (e) {
        expect(e.code).toEqual(ErrorCodes.INVALID_TREE_DATA_FILE);
      }
    });
  });

  describe('SelectComparisonFunction', () => {
    const StaticComparisonFunction = 'SelectComparisonFunction';
    const instanceComparison = 'comparisonFunction';

    it('Should select a comparison function if not selected - number', () => {
      expect(GenericTree[StaticComparisonFunction](5)).toEqual(
        numericComparison
      );
    });

    it('Should save a passed in comparator', () => {
      const tree = new GenericTree<number>({
        comparisonFunction: numericComparison,
      });
      expect(tree[instanceComparison]).toEqual(numericComparison);
    });

    it('Should select a comparison function if not selected - string', () => {
      expect(GenericTree[StaticComparisonFunction]('Whoa')).toEqual(
        stringComparison
      );
    });

    it("Should throw if it ain't got one", () => {
      try {
        GenericTree[StaticComparisonFunction]({ emf: 'Whoa' });
        fail("Shouldn't be here");
      } catch (e) {
        expect(e.code).toEqual(ErrorCodes.COMPARISON_FUNCTION_REQUIRED);
      }
    });
  });

  describe('Load/Save data into the tree', () => {
    describe('With Data', () => {
      const tree = new GenericTree<number>({
        numberOfAllowedChildrenPerNode: 3,
      });
      it('Should load data into the tree', () => {
        tree.loadTreeFromObject(treeData);
        const ROOT = 'root';
        expect(tree[ROOT]).toMatchSnapshot();
        expect(tree.getNodeCount()).toEqual(9);
      });

      it('Should export the data back out', () => {
        expect(tree.saveTreeFromObject()).toEqual(treeData);
      });
    });
    describe('Without data', () => {
      it('Should return undefined if we got nothing to save', () => {
        const tree = new GenericTree<number>({
          numberOfAllowedChildrenPerNode: 3,
        });
        expect(tree.saveTreeFromObject()).toBeUndefined();
      });
    });
  });

  describe('Traversals', () => {
    it('Should do nothing if we give it no data to work with', () => {
      const tree = new GenericTree<number>({
        comparisonFunction: numericComparison,
        numberOfAllowedChildrenPerNode: 3,
      });
      const output: number[] = [];
      const lambda = (node: Node<number>) => {
        output.push(node.value);
      };
      tree.traverse(Traversal.Breadth_First, lambda);
      expect(output).toEqual([]);
    });

    it('Should do Breadth First', () => {
      const tree = new GenericTree<number>({
        comparisonFunction: numericComparison,
        initializeWithDataFile: treeData,
        numberOfAllowedChildrenPerNode: 3,
      });
      const output: number[] = [];
      const lambda = (node: Node<number>) => {
        output.push(node.value);
      };
      tree.traverse(Traversal.Breadth_First, lambda);
      expect(output).toEqual([7, 8, 6, 5, 4, 3, 2, 1, 0]);
    });

    it('Should do depth first, preorder', () => {
      const tree = new GenericTree<number>({
        comparisonFunction: numericComparison,
        initializeWithDataFile: treeData,
        numberOfAllowedChildrenPerNode: 3,
      });
      const output: number[] = [];
      const lambda = (node: Node<number>) => {
        output.push(node.value);
      };
      tree.traverse(Traversal.DepthFirstPreOrder, lambda);
      expect(output).toEqual([7, 8, 5, 4, 3, 6, 2, 1, 0]);
    });

    it('Should do depth first, postorder', () => {
      const tree = new GenericTree<number>({
        comparisonFunction: numericComparison,
        initializeWithDataFile: treeData,
        numberOfAllowedChildrenPerNode: 3,
      });
      const output: number[] = [];
      const lambda = (node: Node<number>) => {
        output.push(node.value);
      };
      tree.traverse(Traversal.DepthFirstPostOrder, lambda);
      expect(output).toEqual([5, 4, 3, 8, 2, 1, 0, 6, 7]);
    });

    it('Should do depth first, inorder', () => {
      const tree = new GenericTree<number>({
        comparisonFunction: numericComparison,
        initializeWithDataFile: treeData,
        numberOfAllowedChildrenPerNode: 3,
      });
      const output: number[] = [];
      const lambda = (node: Node<number>) => {
        output.push(node.value);
      };
      tree.traverse(Traversal.DepthFirstInOrder, lambda);
      expect(output).toEqual([7, 5, 4, 3, 8, 2, 1, 0, 6]);
    });
  });
});

const treeData: ITreeObject<number> = {
  children: [
    {
      children: [
        {
          children: [],
          value: 5,
        },
        {
          children: [],
          value: 4,
        },
        {
          children: [],
          value: 3,
        },
      ],
      value: 8,
    },
    {
      children: [
        {
          children: [],
          value: 2,
        },
        {
          children: [],
          value: 1,
        },
        {
          children: [],
          value: 0,
        },
      ],
      value: 6,
    },
  ],
  value: 7,
};
