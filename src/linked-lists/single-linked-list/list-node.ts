export class ListNode<T> {
  public next: ListNode<T> | null = null;
  public payload: T;

  constructor(payload: T, previous?: ListNode<T>) {
    this.payload = payload;
    if (previous) {
      previous.next = this;
    } else {
      this.next = null;
    }
  }
}
