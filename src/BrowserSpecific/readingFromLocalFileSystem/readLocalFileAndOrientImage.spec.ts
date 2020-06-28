import { doIBeCompressing } from "./readLocalFileAndOrientImage";

describe("Testing doIBeCompressing", () => {
  it("If always compress is on, then always compress", () => {
    const file = {
      size: 1000,
    };
    const results = doIBeCompressing({
      alwaysApplyCompression: true,
      file: file as any,
    });
    expect(results).toBeTruthy();
  });

  it("If always compress is off, and compressWhenAboveFileSize is undefined then return false", () => {
    const file = {
      size: 1000,
    };
    const results = doIBeCompressing({
      alwaysApplyCompression: false,
      file: file as any,
    });
    expect(results).toBeFalsy();
  });

  it("If always compress is off, and compressWhenAboveFileSize is defined, and the file is over a given limit then return true", () => {
    const file = {
      size: 1000,
    };
    const results = doIBeCompressing({
      compressWhenAboveFileSize: 500,
      file: file as any,
    });
    expect(results).toBeTruthy();
  });

  it("If always compress is off, and compressWhenAboveFileSize is defined, and the file is over a given limit then return false", () => {
    const file = {
      size: 1000,
    };
    const results = doIBeCompressing({
      compressWhenAboveFileSize: 5000,
      file: file as any,
    });
    expect(results).toBeFalsy();
  });
});

/*
export function doIBeCompressing(options: Options): boolean {
  const alwaysApplyCompression =
    options.alwaysApplyCompression === undefined
      ? false
      : options.alwaysApplyCompression;

  if (alwaysApplyCompression) {
    return true;
  }

  if (options.compressWhenAboveFileSize === undefined) {
    return false;
  }

  if (options.file.size > options.compressWhenAboveFileSize) {
    return true;
  }

  return false;
}
*/
