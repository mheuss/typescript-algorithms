import { UndirectedAdjacencyListGraph } from './index';

describe('Undirected Adjacency Graph Unit tests', () => {
  it('Should add a vertex when asked', () => {
    const graph = new UndirectedAdjacencyListGraph<string, boolean>();
    graph.addVertex('New Vertex', 'Molly Coddle');
    expect(graph.getAdjacencyList()).toEqual({
      'New Vertex': { edges: {}, payload: 'Molly Coddle' },
    });
  });

  describe('Add edges', () => {
    it('Should add an edge between vertices', () => {
      const graph = new UndirectedAdjacencyListGraph<boolean, boolean>();
      graph.addVertex('Point A', true);
      graph.addVertex('Point B', false);
      graph.addEdge(
        { name: 'Point A', payload: true },
        { name: 'Point B', payload: false }
      );
      expect(graph.getAdjacencyList()).toEqual({
        'Point A': { edges: { 'Point B': true }, payload: true },
        'Point B': { edges: { 'Point A': false }, payload: false },
      });
    });

    it('Should throw if we try to add to a non existent vertex', () => {
      const graph = new UndirectedAdjacencyListGraph<boolean, boolean>();
      graph.addVertex('Point A', true);
      graph.addVertex('Point B', false);

      expect(() =>
        graph.addEdge(
          { name: 'Point A', payload: true },
          { name: 'Point C', payload: true }
        )
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('Removal', () => {
    let graph: UndirectedAdjacencyListGraph<boolean, boolean>;

    beforeEach(() => {
      graph = new UndirectedAdjacencyListGraph<boolean, boolean>();
      graph.addVertex('Point A', true);
      graph.addVertex('Point B', true);
      graph.addVertex('Point C', false);
      graph.addVertex('Point D', false);
      graph.addEdge(
        { name: 'Point A', payload: true },
        { name: 'Point D', payload: false }
      );
      graph.addEdge(
        { name: 'Point A', payload: true },
        { name: 'Point C', payload: false }
      );
      graph.addEdge(
        { name: 'Point B', payload: true },
        { name: 'Point D', payload: false }
      );
      graph.addEdge(
        { name: 'Point B', payload: true },
        { name: 'Point C', payload: false }
      );
      graph.addEdge(
        { name: 'Point C', payload: true },
        { name: 'Point A', payload: false }
      );
      graph.addEdge(
        { name: 'Point C', payload: true },
        { name: 'Point B', payload: false }
      );
      graph.addEdge(
        { name: 'Point D', payload: true },
        { name: 'Point A', payload: false }
      );
      graph.addEdge(
        { name: 'Point D', payload: true },
        { name: 'Point B', payload: false }
      );
    });

    it('should remove an edge', () => {
      graph.removeEdge('Point A', 'Point D');
      expect(graph.getAdjacencyList()).toMatchSnapshot();
    });

    it('Should remove a vertex', () => {
      graph.removeVertex('Point A');
      expect(graph.getAdjacencyList()).toMatchSnapshot();
    });
  });
});
