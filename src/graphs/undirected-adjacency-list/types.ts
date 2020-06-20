export interface IEdgeParameter<EdgeGeneric> {
  name: string;
  payload?: EdgeGeneric;
}

export interface IVertices<VertexGeneric, EdgeGeneric> {
  [key: string]: IVertex<VertexGeneric, EdgeGeneric>;
}

export interface IVertex<VertexGeneric, EdgeGeneric> {
  edges: IEdges<EdgeGeneric>;
  payload?: VertexGeneric;
}

export interface IEdges<EdgeGeneric> {
  [key: string]: EdgeGeneric;
}
