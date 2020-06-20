// Adjacency List - stores data in a list, indexed by the node
import { ErrorCodes } from '../../constants';
import { IEdgeParameter, IVertices } from './types';

export class UndirectedAdjacencyListGraph<VertexPayload, EdgePayload> {
  protected vertices: IVertices<VertexPayload, EdgePayload>;

  constructor() {
    this.vertices = {};
  }

  /**
   * Adds an edge to the graph between two vertices
   * @param vertexOne
   * @param vertexTwo
   */
  public addEdge = (
    vertexOne: IEdgeParameter<EdgePayload>,
    vertexTwo: IEdgeParameter<EdgePayload>
  ) => {
    if (
      this.vertices[vertexTwo.name] === undefined ||
      this.vertices[vertexTwo.name] === undefined
    ) {
      throw {
        code: ErrorCodes.OPERATION_BEYOND_BOUNDS,
        message: `One or both of these vertices don't exist ${vertexOne.name} / ${vertexTwo.name}`,
      };
    }

    if (
      this.vertices[vertexOne.name] &&
      !this.vertices[vertexOne.name].edges[vertexTwo.name] !== undefined &&
      vertexOne.payload !== undefined
    ) {
      this.vertices[vertexOne.name].edges[vertexTwo.name] = vertexOne.payload;
    }

    if (
      this.vertices[vertexTwo.name] &&
      !this.vertices[vertexTwo.name].edges[vertexOne.name] !== undefined &&
      vertexTwo.payload !== undefined
    ) {
      this.vertices[vertexTwo.name].edges[vertexOne.name] = vertexTwo.payload;
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
}
