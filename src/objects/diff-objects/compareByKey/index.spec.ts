import { cloneDeep } from "lodash";
import { newFile, originalFile } from "../mockData";
import { IBankData } from "../mockTypes";
import { CompareByKey } from "./index";

describe("compareByKey unit tests", () => {
  describe("Hash map creation test", () => {
    it("Should correctly map the files", () => {
      const file = new CompareByKey<IBankData>(
        originalFile,
        newFile,
        "routing_number"
      );
      const ORIGINAL_FILE = "originalObject";
      const NEW_FILE = "newObject";

      expect(file[ORIGINAL_FILE]).toMatchSnapshot();
      expect(file[NEW_FILE]).toMatchSnapshot();
    });

    it("Should ensure we are protected from an undefined key", () => {
      const modifiedOriginalFile = cloneDeep(originalFile);

      delete modifiedOriginalFile[0].routing_number;
      try {
        const file = new CompareByKey<IBankData>(
          modifiedOriginalFile,
          newFile,
          "routing_number"
        );
        fail(`Should have thrown ${file}`);
      } catch (e) {
        expect(e).toMatchSnapshot();
      }
    });

    it("Should ensure we are protected from a duplicate key", () => {
      const modifiedOriginalFile = cloneDeep(originalFile);

      modifiedOriginalFile[1].routing_number =
        modifiedOriginalFile[0].routing_number;
      try {
        const file = new CompareByKey<IBankData>(
          modifiedOriginalFile,
          newFile,
          "routing_number"
        );
        fail(`Should have thrown ${file}`);
      } catch (e) {
        expect(e).toMatchSnapshot();
      }
    });

    it("Should give me a list of data no longer in file", () => {
      const file = new CompareByKey<IBankData>(
        originalFile,
        newFile,
        "routing_number"
      );
      expect(file.getDataNoLongerInFile()).toMatchSnapshot();
    });

    it("Should give me a list of new data in file", () => {
      const file = new CompareByKey<IBankData>(
        originalFile,
        newFile,
        "routing_number"
      );
      expect(file.getNewData()).toMatchSnapshot();
    });
  });
});
