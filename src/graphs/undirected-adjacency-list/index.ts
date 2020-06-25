// Adjacency List - stores data in a list, indexed by the node
import { ErrorCodes } from '../../constants';
import {
  IEdgeParameter,
  IVertex,
  IVertices,
  IVisitedVertex,
  TraversalCallback,
} from './types';

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
      this.vertices[vertexOne.name].edges[vertexTwo.name] = vertexOne.payload;
    }

    if (
      this.vertices[vertexTwo.name] &&
      this.vertices[vertexTwo.name].edges[vertexOne.name] === undefined &&
      vertexTwo.payload !== undefined
    ) {
      this.vertices[vertexTwo.name].edges[vertexOne.name] = vertexTwo.payload;
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
      this.vertices[vertexOneName].edges[vertexTwoName] = payload;
    }

    if (
      this.vertices[vertexTwoName] &&
      this.vertices[vertexTwoName].edges[vertexOneName] === undefined &&
      payload !== undefined
    ) {
      this.vertices[vertexTwoName].edges[vertexOneName] = payload;
    }
  };

  /**
   * Adds a vertex
   * @param name
   * @param payload
   */
  public addVertex = (name: string, payload?: VertexPayload) => {
    if (!this.vertices[name]) {
      this.vertices[name] = { edges: {}, payload };
    }
  };

  /**
   * Returns the object containing the vertex and edge data
   */
  public getAdjacencyList = () => {
    return { ...this.vertices };
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

  public depthFirstTraversal = (
    startingVertex: string,
    callback: TraversalCallback<VertexPayload, EdgePayload>
  ) => {
    const visited: IVisitedVertex = {};
    if (this.vertices[startingVertex] === undefined) {
      throw {
        code: ErrorCodes.OPERATION_BEYOND_BOUNDS,
        message: 'Invalid vertex passed in',
      };
    }
    this.depthFirstTraversalHelper(
      this.vertices[startingVertex],
      startingVertex,
      callback,
      visited
    );
  };

  private depthFirstTraversalHelper = (
    currentVertex: IVertex<VertexPayload, EdgePayload>,
    vertexName: string,
    callback: TraversalCallback<VertexPayload, EdgePayload>,
    visited: IVisitedVertex
  ) => {
    visited[vertexName] = true;

    // Look at all vertices - if we got none, leave
    const connectedVertices = Object.keys(currentVertex.edges);
    if (connectedVertices.length === 0) {
      callback({
        connectedVertexName: undefined,
        edge: undefined,
        vertex: currentVertex,
        vertexName,
      });
      return;
    }

    // Let's filter out the ones visited
    const unvisitedVertices: string[] = [];
    connectedVertices.forEach((vertexKey: string) => {
      if (visited[vertexKey] === undefined) {
        unvisitedVertices.push(vertexKey);
      }
    });

    // If no unvisited remain, peace out
    if (unvisitedVertices.length === 0) {
      callback({
        connectedVertexName: undefined,
        edge: undefined,
        vertex: currentVertex,
        vertexName,
      });
      return;
    }

    unvisitedVertices.forEach(connectedVertexName => {
      callback({
        connectedVertexName,
        edge: currentVertex.edges[connectedVertexName],
        vertex: currentVertex,
        vertexName,
      });

      this.depthFirstTraversalHelper(
        this.vertices[connectedVertexName],
        connectedVertexName,
        callback,
        visited
      );
    });
  };
}
