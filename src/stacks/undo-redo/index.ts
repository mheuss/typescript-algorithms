import { Stack } from '../generic';

/*
This is a pair of stacks that can be used to implement an undo/redo storage system.

It obeys the following rules:

1. LIFO for both stacks - undo and redo
2. When a new item is put onto the undo stack, redo clears.
3. When an item is taken from redo, it automatically gets push onto undo
4. When an item is taken from undo, it automatically gets placed onto redo
5. Clear will clear both undo and redo queue
 */
export class UndoRedo<T> {
  private undoStack: Stack<T>;
  private redoStack: Stack<T>;

  constructor() {
    this.undoStack = new Stack<T>();
    this.redoStack = new Stack<T>();
  }

  public put = (newItem: T) => {
    this.undoStack.put(newItem);
    this.redoStack.discard();
  };

  public undo = (): T | undefined => {
    const itemUndoing = this.undoStack.get();
    if (itemUndoing === undefined) {
      return undefined;
    }

    this.redoStack.put(itemUndoing);

    return itemUndoing;
  };

  public redo = (): T | undefined => {
    const itemRedoing = this.redoStack.get();
    if (itemRedoing === undefined) {
      return undefined;
    }

    this.undoStack.put(itemRedoing);

    return itemRedoing;
  };

  public clear = () => {
    this.undoStack.discard();
    this.redoStack.discard();
  };

  public undoCount = (): number => {
    return this.undoStack.length();
  };

  public redoCount = (): number => {
    return this.redoStack.length();
  };
}
