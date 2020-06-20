export interface ITreeObject<T> {
  children: Array<ITreeObject<T>>;
  value: T;
}

export enum Traversal {
  Breadth_First,
  DepthFirstInOrder,
  DepthFirstPreOrder,
  DepthFirstPostOrder,
}
