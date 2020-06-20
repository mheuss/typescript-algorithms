export class Node<T> {
  public value: T;
  public children: Array<Node<T>>;
  public parent: Node<T> | null;

  constructor(value: T, parent?: Node<T> | null) {
    this.value = value;
    this.children = [];
    this.parent = parent ? parent : null;
  }
}
