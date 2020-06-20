export class DoublyLinkedNode<T> {
  public previous: DoublyLinkedNode<T> | null = null;
  public next: DoublyLinkedNode<T> | null = null;
  public payload: T;

  constructor(payload: T, previous?: DoublyLinkedNode<T>) {
    this.payload = payload;
    if (previous) {
      previous.next = this;
      this.previous = previous;
    }
  }
}
