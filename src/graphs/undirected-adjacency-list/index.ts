// Adjacency List - stores data in a list, indexed by the node
import { cloneDeep } from 'lodash';
import { ErrorCodes } from '../../constants';
import { IAdjacencyList, IEdge, IVertex } from './types';

export class UndirectedAdjacencyListGraph<VertexData, EdgeData> {
  protected adjacencyList: IAdjacencyList<EdgeData>;
  protected vertexPayload: IVertex<VertexData>;

  constructor() {
    this.adjacencyList = {};
    this.vertexPayload = {};
  }

  public addVertex = (name: string, payload?: VertexData) => {
    if (!this.adjacencyList[name]) {
      this.adjacencyList[name] = {};
    }
    if (payload) {
      this.vertexPayload[name] = payload;
    }
  };

  public removeVertex = (name: string) => {
    if (this.adjacencyList[name]) {
      const keys = Object.keys(this.adjacencyList[name]);
      keys.forEach((vertex: string) => {
        this.removeEdge(name, vertex);
      });

      delete this.vertexPayload[name];
      delete this.adjacencyList[name];
    }
  };

  public addEdge = (vertexOne: IEdge<EdgeData>, vertexTwo: IEdge<EdgeData>) => {
    if (
      this.adjacencyList[vertexTwo.name] === undefined ||
      this.adjacencyList[vertexTwo.name] === undefined
    ) {
      throw {
        code: ErrorCodes.OPERATION_BEYOND_BOUNDS,
        message: `One or both of these vertices don't exist ${vertexOne.name} / ${vertexTwo.name}`,
      };
    }

    if (
      this.adjacencyList[vertexOne.name] &&
      !this.adjacencyList[vertexOne.name][vertexTwo.name] !== undefined &&
      vertexOne.payload !== undefined
    ) {
      this.adjacencyList[vertexOne.name][vertexTwo.name] = vertexOne.payload;
    }

    if (
      this.adjacencyList[vertexTwo.name] &&
      !this.adjacencyList[vertexTwo.name][vertexOne.name] !== undefined &&
      vertexTwo.payload !== undefined
    ) {
      this.adjacencyList[vertexTwo.name][vertexOne.name] = vertexTwo.payload;
    }
  };

  public removeEdge = (vertexOneName: string, vertexTwoName: string) => {
    if (
      this.adjacencyList[vertexOneName] &&
      !this.adjacencyList[vertexOneName][vertexTwoName] !== undefined
    ) {
      delete this.adjacencyList[vertexOneName][vertexTwoName];
    }

    if (
      this.adjacencyList[vertexTwoName] &&
      !this.adjacencyList[vertexTwoName][vertexOneName] !== undefined
    ) {
      delete this.adjacencyList[vertexTwoName][vertexOneName];
    }
  };

  public getAdjacencyList = () => {
    return { ...this.adjacencyList };
  };

  public getVertexData = (name: string) => {
    return this.vertexPayload[name] === undefined
      ? undefined
      : cloneDeep(this.vertexPayload[name]);
  };
}
