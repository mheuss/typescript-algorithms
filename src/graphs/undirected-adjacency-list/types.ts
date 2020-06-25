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

export interface ITraversalPayload<VertexGeneric, EdgeGeneric> {
  connectedVertexName?: string;
  edge?: EdgeGeneric;
  vertex: IVertex<VertexGeneric, EdgeGeneric>;
  vertexName: string;
}

export type TraversalCallback<VertexGeneric, EdgeGeneric> = (vertexAndEdge: ITraversalPayload<VertexGeneric, EdgeGeneric>)=>void;

export interface IVisitedVertex {
  [key: string]: boolean;
}
