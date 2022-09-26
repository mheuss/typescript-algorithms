import { UndirectedAdjacencyListGraph } from "./index";
import { IDistance, IStates } from "./mockData";
import {
  IShortestPathPayload,
  ITraversalPayload,
  ShortestPathCallback,
} from "./types";

describe("Undirected Adjacency Graph Unit tests", () => {
  describe("Dijkstra's Shortest Path", () => {
    const callback: ShortestPathCallback<IStates, IDistance> = (
      vertexAndEdge: IShortestPathPayload<IStates, IDistance>
    ) => {
      return vertexAndEdge.edge.payload.miles;
    };
    it("Should find the shortest path from Augusta to Albany", () => {
      const graph = setupGraphs();

      expect(graph.dijkstraShortestPath("Maine", "New York", callback)).toEqual(
        ["New Hampshire", "Vermont", "New York"]
      );
      expect(
        graph.dijkstraShortestPath("Massachusetts", "New York", callback)
      ).toEqual(["Connecticut", "New York"]);
    });

    it("Should return [] if there is no valid path - Connected to unconnected", () => {
      const graph = setupGraphs();
      graph.addVertex("Georgia", { capital: "Atlanta" });
      expect(graph.dijkstraShortestPath("Maine", "Georgia", callback)).toEqual(
        []
      );
    });

    it("Should return [] if there is no valid path - unconnected to connected", () => {
      const graph = setupGraphs();
      graph.addVertex("Georgia", { capital: "Atlanta" });
      expect(graph.dijkstraShortestPath("Georgia", "Maine", callback)).toEqual(
        []
      );
    });

    it("Should return empty array if asked to path for itself", () => {
      const graph = setupGraphs();
      expect(graph.dijkstraShortestPath("Maine", "Maine", callback)).toEqual(
        []
      );
    });

    it("Should throw if given nonexistant vertices", () => {
      const graph = setupGraphs();
      expect(() =>
        graph.dijkstraShortestPath("Ramsflat", "Maine", callback)
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        graph.dijkstraShortestPath("Maine", "Farblebutt", callback)
      ).toThrowErrorMatchingSnapshot();
    });
  });

  it("Should add a vertex when asked", () => {
    const graph = new UndirectedAdjacencyListGraph<string, boolean>();
    graph.addVertex("New Vertex", "Molly Coddle");
    expect(graph.getAdjacencyList()).toEqual({
      "New Vertex": { edges: {}, name: "New Vertex", payload: "Molly Coddle" },
    });
  });

  describe("Fetch Data from graph", () => {
    it("Should give me the payload of an item in a graph", () => {
      const graph = setupGraphs();
      expect(graph.getVertex("Massachusetts")).toEqual({ capital: "Boston" });
    });

    it("Should give me the payload of an vertex between two points in a graph", () => {
      const graph = setupGraphs();
      expect(graph.getEdge("Massachusetts", "New Hampshire")).toEqual({
        miles: 164,
      });
    });

    it("Should give me all the vertexes a single vertex is connected to", () => {
      const graph = setupGraphs();
      expect(graph.getEdges("Massachusetts")).toEqual([
        "Connecticut",
        "New Hampshire",
        "Vermont",
        "Rhode Island",
      ]);
    });

    it("Should return an empty array if we are trying to get edges from nothing", () => {
      const graph = setupGraphs();
      expect(graph.getEdges("Splindeforuos")).toEqual([]);
    });
  });

  describe("Add edges", () => {
    it("Should add an edge between vertices", () => {
      const graph = new UndirectedAdjacencyListGraph<boolean, boolean>();
      graph.addVertex("Point A", true);
      graph.addVertex("Point B", false);
      graph.addEdgeWithSeparatePayloads(
        { name: "Point A", payload: true },
        { name: "Point B", payload: false }
      );
      expect(graph.getAdjacencyList()).toEqual({
        "Point A": {
          edges: { "Point B": { name: "Point B", payload: true } },
          name: "Point A",
          payload: true,
        },
        "Point B": {
          edges: { "Point A": { name: "Point A", payload: false } },
          name: "Point B",
          payload: false,
        },
      });
    });

    it("Should throw if we try to add to a non existent vertex", () => {
      const graph = new UndirectedAdjacencyListGraph<boolean, boolean>();
      graph.addVertex("Point A", true);
      graph.addVertex("Point B", false);

      expect(() =>
        graph.addEdgeWithSeparatePayloads(
          { name: "Point A", payload: true },
          { name: "Point C", payload: true }
        )
      ).toThrowErrorMatchingSnapshot();
    });
  });

  it("Should add an edge between vertices with a shared payload", () => {
    const graph = new UndirectedAdjacencyListGraph<boolean, boolean>();
    graph.addVertex("Point A", true);
    graph.addVertex("Point B", false);
    graph.addEdgeWithSharedPayload("Point A", "Point B", false);
    expect(graph.getAdjacencyList()).toEqual({
      "Point A": {
        edges: { "Point B": { name: "Point B", payload: false } },
        name: "Point A",
        payload: true,
      },
      "Point B": {
        edges: { "Point A": { name: "Point A", payload: false } },
        name: "Point B",
        payload: false,
      },
    });
  });

  it("Should throw if we try to add to a non existent vertex", () => {
    const graph = new UndirectedAdjacencyListGraph<boolean, boolean>();
    graph.addVertex("Point A", true);
    graph.addVertex("Point B", false);

    expect(() =>
      graph.addEdgeWithSharedPayload("Point C", "Point B", false)
    ).toThrowErrorMatchingSnapshot();
  });
});

describe("Removal", () => {
  let graph: UndirectedAdjacencyListGraph<boolean, boolean>;

  beforeEach(() => {
    graph = new UndirectedAdjacencyListGraph<boolean, boolean>();
    graph.addVertex("Point A", true);
    graph.addVertex("Point B", true);
    graph.addVertex("Point C", false);
    graph.addVertex("Point D", false);
    graph.addEdgeWithSeparatePayloads(
      { name: "Point A", payload: true },
      { name: "Point D", payload: false }
    );
    graph.addEdgeWithSeparatePayloads(
      { name: "Point A", payload: true },
      { name: "Point C", payload: false }
    );
    graph.addEdgeWithSeparatePayloads(
      { name: "Point B", payload: true },
      { name: "Point D", payload: false }
    );
    graph.addEdgeWithSeparatePayloads(
      { name: "Point B", payload: true },
      { name: "Point C", payload: false }
    );
    graph.addEdgeWithSeparatePayloads(
      { name: "Point C", payload: true },
      { name: "Point A", payload: false }
    );
    graph.addEdgeWithSeparatePayloads(
      { name: "Point C", payload: true },
      { name: "Point B", payload: false }
    );
    graph.addEdgeWithSeparatePayloads(
      { name: "Point D", payload: true },
      { name: "Point A", payload: false }
    );
    graph.addEdgeWithSeparatePayloads(
      { name: "Point D", payload: true },
      { name: "Point B", payload: false }
    );
  });

  it("should remove an edge", () => {
    graph.removeEdge("Point A", "Point D");
    expect(graph.getAdjacencyList()).toMatchSnapshot();
  });

  it("Should remove a vertex", () => {
    graph.removeVertex("Point A");
    expect(graph.getAdjacencyList()).toMatchSnapshot();
  });
});

describe("Traversal", () => {
  let graph: UndirectedAdjacencyListGraph<IStates, IDistance>;
  beforeEach(() => {
    graph = setupGraphs();
  });
  it("Should do a Depth First Traversal", () => {
    const traversalAccumulator: string[] = [];
    const traversalCallback = (
      vertexAndEdge: ITraversalPayload<IStates, IDistance>
    ) => {
      if (vertexAndEdge.edge === undefined) {
        traversalAccumulator.push(`We are at ${vertexAndEdge.vertex.name}`);
        return;
      }
      traversalAccumulator.push(
        `We are at ${vertexAndEdge.vertex.name} and we came from ${vertexAndEdge.edge.name}`
      );
    };

    graph.depthFirstTraversal("Maine", traversalCallback);
    expect(traversalAccumulator).toMatchSnapshot();
  });

  it("Should not do a Depth First Traversal if we do not give it a valid starting point", () => {
    const traversalCallback = () => {
      return;
    };

    expect(() => {
      graph.depthFirstTraversal("Splasndis", traversalCallback);
    }).toThrowErrorMatchingSnapshot();
  });

  it("Should do a Breadth First Traversal", () => {
    const traversalAccumulator: string[] = [];
    const traversalCallback = (
      vertexAndEdge: ITraversalPayload<IStates, IDistance>
    ) => {
      if (vertexAndEdge.edge === undefined) {
        traversalAccumulator.push(`We are at ${vertexAndEdge.vertex.name}`);
        return;
      }
      traversalAccumulator.push(
        `We are at ${vertexAndEdge.vertex.name} and we came from ${vertexAndEdge.edge.name}`
      );
    };

    graph.breadthFirstTraversal("Maine", traversalCallback);
    expect(traversalAccumulator).toMatchSnapshot();
  });

  it("Should not do a Breadth First Traversal if we do not give it a valid starting point", () => {
    const traversalCallback = () => {
      return;
    };

    expect(() => {
      graph.breadthFirstTraversal("Splasndis", traversalCallback);
    }).toThrowErrorMatchingSnapshot();
  });
});

function setupGraphs() {
  const graph = new UndirectedAdjacencyListGraph<IStates, IDistance>();

  graph.addVertex("Connecticut", { capital: "Hartford" });
  graph.addVertex("Maine", { capital: "Augusta" });
  graph.addVertex("Massachusetts", { capital: "Boston" });
  graph.addVertex("New Hampshire", { capital: "Concord" });
  graph.addVertex("New York", { capital: "Albany" });
  graph.addVertex("Rhode Island", { capital: "Providence" });
  graph.addVertex("Vermont", { capital: "Montpelier" });

  graph.addEdgeWithSharedPayload("Connecticut", "Rhode Island", {
    miles: 87,
  });
  graph.addEdgeWithSharedPayload("Connecticut", "New York", { miles: 163 });
  graph.addEdgeWithSharedPayload("Connecticut", "Massachusetts", {
    miles: 50,
  });

  graph.addEdgeWithSharedPayload("Maine", "New Hampshire", { miles: 164 });

  graph.addEdgeWithSharedPayload("Massachusetts", "New Hampshire", {
    miles: 164,
  });
  graph.addEdgeWithSharedPayload("Massachusetts", "Vermont", { miles: 180 });
  graph.addEdgeWithSharedPayload("Massachusetts", "Rhode Island", {
    miles: 50,
  });

  graph.addEdgeWithSharedPayload("New Hampshire", "Vermont", { miles: 116 });

  graph.addEdgeWithSharedPayload("New York", "Vermont", { miles: 158 });

  return graph;
}
