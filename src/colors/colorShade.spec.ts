import * as colorShade from "./colorShade";

describe("compute Color Shade Unit Tests", () => {
  describe("Manipulate Color", () => {
    it("Should return a shade darker when requested", () => {
      const results = colorShade.manipulateColor("33", -10);
      expect(results).toEqual("29");
      // Hex 33 is 51 dec - 10 is 41, which  is hex 29
    });

    it("Should return a shade brighter when requested", () => {
      const results = colorShade.manipulateColor("33", 10);
      expect(results).toEqual("3d");
      // Hex 33 is 51 dec + 10 is 61, which  is hex 3d
    });

    it("Should pad when necessary", () => {
      const results = colorShade.manipulateColor("10", -2);
      expect(results).toEqual("0e");
      // Hex 33 is 51 dec + 10 is 61, which  is hex 3d
    });
  });

  describe("Color Shade Unit Tests", () => {
    it("Should return a brighter color when asked", () => {
      expect(colorShade.colorShade("#777777", 16)).toEqual("#878787");
    });

    it("Should return a brighter color when a darker color is requested, if the color is too dark already", () => {
      expect(colorShade.colorShade("#000000", -16)).toEqual("#101010");
    });

    it("Should return a darker color when a brighter color is requested, if the color is too bright already", () => {
      expect(colorShade.colorShade("#FFFFFF", 16)).toEqual("#efefef");
    });

    it("Should return undefined when color is undefined", () => {
      expect(colorShade.colorShade(undefined as any, 16)).toEqual(undefined);
    });

    it("Should return undefined when color is too short", () => {
      expect(colorShade.colorShade("red", 16)).toEqual("red");
    });

    it("Should return undefined when color is too long", () => {
      expect(colorShade.colorShade("red is my favorite red color", 16)).toEqual(
        "red is my favorite red color"
      );
    });
  });
});
