export interface IEdges<EdgeGeneric> {
  [key: string]: EdgeGeneric;
}

export interface IAdjacencyList<EdgeGeneric> {
  [key: string]: IEdges<EdgeGeneric>;
}

export interface IEdge<EdgeGeneric> {
  name: string;
  payload?: EdgeGeneric;
}

export interface IVertex<VertexGeneric> {
  [key: string]: VertexGeneric;
}
