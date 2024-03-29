// Adjacency List - stores data in a list, indexed by the node
import { ErrorCodes } from "../../constants";
import { Queue } from "../../queues/fifo-queue";
import { MinPriorityQueue } from "../../queues/priority-queues/min-priority-queue";
import {
  IEdgeParameter,
  IVertexAndEdgeName,
  IVertices,
  IVisitedVertex,
  ShortestPathCallback,
  TraversalCallback,
} from "./types";

export class UndirectedAdjacencyListGraph<VertexPayload, EdgePayload> {
  protected vertices: IVertices<VertexPayload, EdgePayload>;

  constructor() {
    this.vertices = {};
  }

  /**
   * Adds an edge to the graph between two vertices, with two seperate payloads defined
   * @param vertexOne
   * @param vertexTwo
   */
  public addEdgeWithSeparatePayloads = (
    vertexOne: IEdgeParameter<EdgePayload>,
    vertexTwo: IEdgeParameter<EdgePayload>
  ) => {
    if (
      this.vertices[vertexOne.name] === undefined ||
      this.vertices[vertexTwo.name] === undefined
    ) {
      throw {
        code: ErrorCodes.OPERATION_BEYOND_BOUNDS,
        message: `One or both of these vertices don't exist ${vertexOne.name} / ${vertexTwo.name}`,
      };
    }

    if (
      this.vertices[vertexOne.name] &&
      this.vertices[vertexOne.name].edges[vertexTwo.name] === undefined &&
      vertexOne.payload !== undefined
    ) {
      this.vertices[vertexOne.name].edges[vertexTwo.name] = {
        name: vertexTwo.name,
        payload: vertexOne.payload,
      };
    }

    if (
      this.vertices[vertexTwo.name] &&
      this.vertices[vertexTwo.name].edges[vertexOne.name] === undefined &&
      vertexTwo.payload !== undefined
    ) {
      this.vertices[vertexTwo.name].edges[vertexOne.name] = {
        name: vertexOne.name,
        payload: vertexTwo.payload,
      };
    }
  };

  /**
   * Adds an edge, with a single payload shared between two vertices
   * @param {string} vertexOneName
   * @param {string} vertexTwoName
   * @param {EdgePayload} payload
   * @throws ErrorCodes.OPERATION_BEYOND_BOUNDS if a vertex name does not exist
   */
  public addEdgeWithSharedPayload = (
    vertexOneName: string,
    vertexTwoName: string,
    payload: EdgePayload
  ) => {
    if (
      this.vertices[vertexOneName] === undefined ||
      this.vertices[vertexTwoName] === undefined
    ) {
      throw {
        code: ErrorCodes.OPERATION_BEYOND_BOUNDS,
        message: `One or both of these vertices don't exist ${vertexOneName} / ${vertexTwoName}`,
      };
    }

    if (
      this.vertices[vertexOneName] &&
      this.vertices[vertexOneName].edges[vertexTwoName] === undefined &&
      payload !== undefined
    ) {
      this.vertices[vertexOneName].edges[vertexTwoName] = {
        name: vertexTwoName,
        payload,
      };
    }

    if (
      this.vertices[vertexTwoName] &&
      this.vertices[vertexTwoName].edges[vertexOneName] === undefined &&
      payload !== undefined
    ) {
      this.vertices[vertexTwoName].edges[vertexOneName] = {
        name: vertexOneName,
        payload,
      };
    }
  };

  /**
   * Adds a vertex
   * @param name
   * @param payload
   */
  public addVertex = (name: string, payload?: VertexPayload) => {
    if (!this.vertices[name]) {
      this.vertices[name] = { edges: {}, payload, name };
    }
  };

  /**
   * Returns the object containing the vertex and edge data
   */
  public getAdjacencyList = () => {
    return { ...this.vertices };
  };

  /**
   * Returns a given Vertex payload
   * @param name
   */
  public getVertex = (name: string): VertexPayload | undefined => {
    return this.vertices[name]?.payload;
  };

  /**
   * Returns the edge payload between vertex a and vertex b
   * @param fromVertex
   * @param toVertex
   */
  public getEdge = (
    fromVertex: string,
    toVertex: string
  ): EdgePayload | undefined => {
    return this.vertices[fromVertex]?.edges[toVertex]?.payload;
  };

  /**
   * Returns all edges
   * @param fromVertex
   */
  public getEdges = (fromVertex: string): string[] => {
    if (!this.vertices[fromVertex] || !this.vertices[fromVertex].edges) {
      return [];
    }
    return Object.keys(this.vertices[fromVertex]?.edges);
  };

  /**
   * Remove an edge between two vertices
   * @param vertexOneName
   * @param vertexTwoName
   */
  public removeEdge = (vertexOneName: string, vertexTwoName: string) => {
    if (
      this.vertices[vertexOneName] &&
      !this.vertices[vertexOneName].edges[vertexTwoName] !== undefined
    ) {
      delete this.vertices[vertexOneName].edges[vertexTwoName];
    }

    if (
      this.vertices[vertexTwoName] &&
      !this.vertices[vertexTwoName].edges[vertexOneName] !== undefined
    ) {
      delete this.vertices[vertexTwoName].edges[vertexOneName];
    }
  };

  /**
   * Removes a vertex.
   * @param name
   */
  public removeVertex = (name: string) => {
    if (this.vertices[name]) {
      const keys = Object.keys(this.vertices[name].edges);
      keys.forEach((vertex: string) => {
        this.removeEdge(name, vertex);
      });

      delete this.vertices[name];
    }
  };

  public breadthFirstTraversal = (
    startingVertexName: string,
    callback: TraversalCallback<VertexPayload, EdgePayload>
  ) => {
    const visited: IVisitedVertex = {};
    if (this.vertices[startingVertexName] === undefined) {
      throw {
        code: ErrorCodes.OPERATION_BEYOND_BOUNDS,
        message: "Invalid vertex passed in",
      };
    }

    const fifoQueue = new Queue<IVertexAndEdgeName>();

    this.breadthFirstTraversalHelper(
      startingVertexName,
      undefined,
      callback,
      visited,
      fifoQueue
    );
  };

  public depthFirstTraversal = (
    startingVertexName: string,
    callback: TraversalCallback<VertexPayload, EdgePayload>
  ) => {
    const visited: IVisitedVertex = {};
    if (this.vertices[startingVertexName] === undefined) {
      throw {
        code: ErrorCodes.OPERATION_BEYOND_BOUNDS,
        message: "Invalid vertex passed in",
      };
    }

    this.depthFirstTraversalHelper(
      startingVertexName,
      undefined,
      callback,
      visited
    );
  };

  public dijkstraShortestPath = (
    startingVertex: string,
    endingVertex: string,
    callback: ShortestPathCallback<VertexPayload, EdgePayload>
  ): string[] => {
    const nodes = new MinPriorityQueue<string>();
    const weights: { [key: string]: number } = {};
    const previous: { [key: string]: string } = {};

    if (
      this.vertices[startingVertex] === undefined ||
      this.vertices[endingVertex] === undefined
    ) {
      throw { code: ErrorCodes.OPERATION_BEYOND_BOUNDS };
    }

    Object.keys(this.vertices).forEach((currentVertex: string) => {
      const currentWeight = currentVertex === startingVertex ? 0 : Infinity;
      weights[currentVertex] = currentWeight;
      nodes.enqueue(currentVertex, currentWeight);
    });

    const path: string[] = [];
    let lightestVertex: string;

    while (nodes.getLength()) {
      lightestVertex = nodes.dequeue()!;

      if (lightestVertex !== undefined) {
        if (lightestVertex === endingVertex) {
          while (previous[lightestVertex]) {
            path.push(lightestVertex);
            lightestVertex = previous[lightestVertex];
          }
          return path.reverse();
        }

        if (lightestVertex || weights[lightestVertex] !== Infinity) {
          this.getEdges(lightestVertex).forEach((connectedVertex) => {
            const connectedVertexPathWeight = callback({
              edge: this.vertices[lightestVertex].edges[connectedVertex],
              vertex: this.vertices[lightestVertex],
            });

            const candidate =
              weights[lightestVertex] + connectedVertexPathWeight;
            if (candidate < weights[connectedVertex]) {
              weights[connectedVertex] = candidate;
              previous[connectedVertex] = lightestVertex;
              nodes.enqueue(connectedVertex, candidate);
            }
          });
        }
      }
    }
    return [];
  };

  private depthFirstTraversalHelper = (
    currentVertexName: string,
    incomingEdgeName: string | undefined,
    callback: TraversalCallback<VertexPayload, EdgePayload>,
    visited: IVisitedVertex
  ) => {
    visited[currentVertexName] = true;

    const currentVertex = this.vertices[currentVertexName];
    const edge =
      incomingEdgeName === undefined
        ? undefined
        : currentVertex.edges[incomingEdgeName];

    callback({ edge, vertex: currentVertex });

    const connectedVertices = Object.keys(currentVertex.edges);

    connectedVertices.forEach((connectedVertexName) => {
      if (visited[connectedVertexName] === undefined) {
        this.depthFirstTraversalHelper(
          connectedVertexName,
          currentVertexName,
          callback,
          visited
        );
      }
    });
  };

  private breadthFirstTraversalHelper = (
    currentVertexName: string,
    incomingEdgeName: string | undefined,
    callback: TraversalCallback<VertexPayload, EdgePayload>,
    visited: IVisitedVertex,
    queue: Queue<IVertexAndEdgeName>
  ) => {
    visited[currentVertexName] = true;

    const currentVertex = this.vertices[currentVertexName];
    const edge =
      incomingEdgeName === undefined
        ? undefined
        : currentVertex.edges[incomingEdgeName];

    callback({ edge, vertex: currentVertex });

    Object.keys(currentVertex.edges).forEach((vertexName) => {
      if (visited[vertexName] === undefined) {
        queue.enqueue({ vertexName, edgeName: currentVertexName });
      }
    });

    let vertexAndEdge;

    do {
      vertexAndEdge = queue.dequeue();
      if (vertexAndEdge !== undefined) {
        if (visited[vertexAndEdge.vertexName] === undefined) {
          this.breadthFirstTraversalHelper(
            vertexAndEdge.vertexName,
            vertexAndEdge.edgeName,
            callback,
            visited,
            queue
          );
        }
      }
    } while (queue.length() > 0);
  };
}
