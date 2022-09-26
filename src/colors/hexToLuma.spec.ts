import { hexToLuma } from "./hexToLuma";

describe("Test of hexToLuma", () => {
  it("Should return a white when given a black", () => {
    const results = hexToLuma("#000000");
    expect(results).toEqual(0);
  });

  it("Should return a black when given a white", () => {
    const results = hexToLuma("#FFFFFF");
    expect(results).toEqual(1);
  });

  it("Should return a medium value when given a medium gray", () => {
    expect(hexToLuma("#797979").toFixed(3)).toEqual("0.475");
  });

  it("Should return a bright value when light red", () => {
    expect(hexToLuma("#FFAAAA").toFixed(3)).toEqual("0.766");
  });

  it("Should return less bright value when given a dark blue", () => {
    expect(hexToLuma("#222266").toFixed(3)).toEqual("0.164");
  });
});
