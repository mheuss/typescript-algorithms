import { Stack } from "./index";

describe("Test of Generic Stack", () => {
  const stack = new Stack<number>();

  it("Should be able to push items on it", () => {
    stack.put(1);
    stack.put(2);
    stack.put(3);
    stack.put(4);
    stack.put(5);
    stack.put(6);
    stack.put(7);
    expect(stack.toArray()).toMatchSnapshot();
  });

  it("Should be able to tell us the length", () => {
    expect(stack.length()).toEqual(7);
  });

  it("Should be able to push items off", () => {
    expect(stack.get()).toEqual(7);
    expect(stack.get()).toEqual(6);
    expect(stack.get()).toEqual(5);
    expect(stack.get()).toEqual(4);
    expect(stack.get()).toEqual(3);
    expect(stack.get()).toEqual(2);
    expect(stack.get()).toEqual(1);
  });

  it("Should return nothing if there is nothing to get", () => {
    expect(stack.get()).toBeUndefined();
  });

  it("Should be able to empty the array", () => {
    stack.discard();
    stack.put(1);
    stack.put(2);
    stack.put(3);
    stack.put(4);
    stack.put(5);
    stack.put(6);
    stack.put(7);
    expect(stack.length()).toEqual(7);
  });

  it("Should be able to export an array and load it back in with the same order", () => {
    stack.discard();
    stack.put(1);
    stack.put(2);
    stack.put(3);
    stack.put(4);
    stack.put(5);
    stack.put(6);
    stack.put(7);
    const arr = stack.toArray();
    expect(arr).toMatchSnapshot();
    stack.discard();

    const QUEUE = "queue";
    stack.load(arr);
    expect(stack[QUEUE]).toMatchSnapshot();
  });
});
