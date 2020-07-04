export interface IEdgeParameter<EdgeGeneric> {
  name: string;
  payload?: EdgeGeneric;
}

export interface IVertices<VertexGeneric, EdgeGeneric> {
  [key: string]: IVertex<VertexGeneric, EdgeGeneric>;
}

export interface IVertex<VertexGeneric, EdgeGeneric> {
  edges: IEdges<EdgeGeneric>;
  name: string;
  payload?: VertexGeneric;
}

export interface IEdges<EdgeGeneric> {
  [key: string]: IEdge<EdgeGeneric>;
}

export interface IEdge<EdgeGeneric> {
  payload: EdgeGeneric;
  name: string;
}

export interface ITraversalPayload<VertexGeneric, EdgeGeneric> {
  edge?: IEdge<EdgeGeneric>;
  vertex: IVertex<VertexGeneric, EdgeGeneric>;
}

export type TraversalCallback<VertexGeneric, EdgeGeneric> = (
  vertexAndEdge: ITraversalPayload<VertexGeneric, EdgeGeneric>
) => void;

export interface IShortestPathPayload<VertexGeneric, EdgeGeneric> {
  edge: IEdge<EdgeGeneric>;
  vertex: IVertex<VertexGeneric, EdgeGeneric>;
}

export type ShortestPathCallback<VertexGeneric, EdgeGeneric> = (
  vertexAndEdge: IShortestPathPayload<VertexGeneric, EdgeGeneric>
) => number;

export interface IVisitedVertex {
  [key: string]: boolean;
}

export interface IVertexAndEdgeName {
  vertexName: string;
  edgeName: string;
}
