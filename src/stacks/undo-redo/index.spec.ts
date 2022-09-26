import { UndoRedo } from "./index";

const UNDO_STACK = "undoStack";
const REDO_STACK = "redoStack";

describe("Undo/Redo Stack Tests", () => {
  describe("Place items into undo", () => {
    it("Should allow us to place items into the undo stack", () => {
      const undoStack = new UndoRedo<string>();
      undoStack.put("Drink Alcohol");
      expect(undoStack.undoCount()).toEqual(1);
      expect(undoStack.redoCount()).toEqual(0);
      expect(undoStack[UNDO_STACK].toArray()).toMatchSnapshot();
    });
  });

  describe("Undo nothing", () => {
    it("Should return undefined if there is nothing to undo", () => {
      const undoStack = new UndoRedo<string>();
      expect(undoStack.undo()).toBeUndefined();
    });
  });

  describe("Redo nothing", () => {
    it("Should return undefined if there is nothing to Redo", () => {
      const undoStack = new UndoRedo<string>();
      expect(undoStack.redo()).toBeUndefined();
    });
  });

  describe("Undo Items in sequence", () => {
    const undoStack = new UndoRedo<string>();

    it("Should allow us to place items into the undo stack", () => {
      undoStack.put("Drink Alcohol");
      undoStack.put("Sing Loudly");
      undoStack.put("Dance With Abandon");
      undoStack.put("Drink More");
      undoStack.put("Drive Towards Home");
      undoStack.put("Run into tree");
      expect(undoStack.undoCount()).toEqual(6);
      expect(undoStack.redoCount()).toEqual(0);
      expect(undoStack[UNDO_STACK].toArray()).toMatchSnapshot();
    });

    it("By undoing, we should be populating the redo stack", () => {
      expect(undoStack.undo()).toEqual("Run into tree");
      expect(undoStack.undo()).toEqual("Drive Towards Home");
      expect(undoStack.undo()).toEqual("Drink More");
      expect(undoStack.undo()).toEqual("Dance With Abandon");
      expect(undoStack.undo()).toEqual("Sing Loudly");
      expect(undoStack.undo()).toEqual("Drink Alcohol");
      expect(undoStack.undoCount()).toEqual(0);
      expect(undoStack.redoCount()).toEqual(6);
      expect(undoStack[REDO_STACK].toArray()).toMatchSnapshot();
    });

    it("By redoing, we should be populating the undo stack", () => {
      expect(undoStack.redo()).toEqual("Drink Alcohol");
      expect(undoStack.redo()).toEqual("Sing Loudly");
      expect(undoStack.redo()).toEqual("Dance With Abandon");
      expect(undoStack.undoCount()).toEqual(3);
      expect(undoStack.redoCount()).toEqual(3);
      expect(undoStack[REDO_STACK].toArray()).toMatchSnapshot();
    });
  });

  describe("Test of redo clear when new item pushed into undo", () => {
    const undoStack = new UndoRedo<string>();
    it("Let us get stack parity", () => {
      undoStack.put("Drink Alcohol");
      undoStack.put("Sing Loudly");
      undoStack.put("Dance With Abandon");
      undoStack.put("Drink More");
      undoStack.put("Drive Towards Home");
      undoStack.put("Run into tree");
      undoStack.undo();
      undoStack.undo();
      undoStack.undo();
      expect(undoStack.undoCount()).toEqual(3);
      expect(undoStack.redoCount()).toEqual(3);
    });

    it("Should clear redo when new item pushed", () => {
      undoStack.put("Pass Out");
      expect(undoStack.undoCount()).toEqual(4);
      expect(undoStack.redoCount()).toEqual(0);
    });
  });

  describe("Emptying stack", () => {
    const undoStack = new UndoRedo<string>();

    it("Should allow us to place items into the undo stack", () => {
      undoStack.put("Drink Alcohol");
      undoStack.put("Sing Loudly");
      undoStack.put("Dance With Abandon");
      undoStack.put("Drink More");
      undoStack.put("Drive Towards Home");
      undoStack.put("Run into tree");
      undoStack.undo();
      undoStack.undo();
      undoStack.undo();
      expect(undoStack.undoCount()).toEqual(3);
      expect(undoStack.redoCount()).toEqual(3);
    });

    it("And let us clear", () => {
      undoStack.clear();
      expect(undoStack.undoCount()).toEqual(0);
      expect(undoStack.redoCount()).toEqual(0);
    });
  });
});
