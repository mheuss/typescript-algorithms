import { readLocalFileAsDataURL } from "./readLocalFileAsDataURL";

const compressionStrength = 0.3;

interface IOptions {
  alwaysApplyCompression?: boolean;
  compressWhenAboveFileSize?: number;
  file: File;
}

/**
 * Will attempt to read a file local to the browsers file system and return a data url. When the file is read, we will attempt to check the Exif orientation value and properly
 * orient the file, prior to returning the DataURL.
 * @param {IOptions} options Various options that dictate the file to be loaded, whether or not we force compression for all files, and if we compress over a certain file limit, what that limit might be.
 * @returns {string} DataURL of the image.
 */
export async function readLocalFileAndOrientImage(options: IOptions) {
  const file = options.file;
  const compressionFlag = doIBeCompressing(options);

  const orientation:number = await new Promise((resolve) => {
    const callback = (result: number) => {
      resolve(result);
    };

    getOrientation(file, callback);
  });

  // So, we've got the orientation. Let's read the file.
  const dataURL = await readLocalFileAsDataURL(file);

  // We bail, if orientation isn't set correctly.
  if (orientation < 0 && !compressionFlag) {
    // Here we put in our canvas work?
    return dataURL;
  }

  return new Promise((resolve) => {
    const callback = (result: string) => {
      resolve(result);
    };
    resetOrientation(dataURL, orientation as number, callback, compressionFlag);
  });
}

/*
 * The below function was ripped off from a stack overflow page. I just done typescripted it up, and wrote the wrapping function.
 * Here is the source:
 * https://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side
 */

/**
 * Attempts to read a file and get the proper orientation.
 * @param {File} file File to be read in.
 * @param {function} callback Function to return the result of the parse to... -1 if we don't find the data where we expect it, -2 if this aint no jpeg, otherwise the proper orientation (1-9).
 * @returns {void} Nothing. Work is done through the provided callback.
 */
function getOrientation(file: File, callback: (result: number) => void) {
  const reader = new FileReader();

  reader.onload = (e: any) => {
    if (e === null || e.target === null) {
      return;
    }

    const view = new DataView(e.target.result);
    // If it aint a jpeg, we be gone
    if (view.getUint16(0, false) !== 0xffd8) {
      return callback(-2);
    }

    const length = view.byteLength;
    let offset = 2;

    while (offset < length) {
      if (view.getUint16(offset + 2, false) <= 8) {
        return callback(-1);
      }

      const marker = view.getUint16(offset, false);
      offset += 2;
      if (marker === 0xffe1) {
        if (view.getUint32((offset += 2), false) !== 0x45786966) {
          return callback(-1);
        }

        const little = view.getUint16((offset += 6), false) === 0x4949;
        offset += view.getUint32(offset + 4, little);
        const tags = view.getUint16(offset, little);
        offset += 2;
        for (let i = 0; i < tags; i++) {
          if (view.getUint16(offset + i * 12, little) === 0x0112) {
            return callback(view.getUint16(offset + i * 12 + 8, little));
          }
        }
      }
      // tslint:disable-next-line:no-bitwise
      else if ((marker & 0xff00) !== 0xff00) {
        break;
      } else {
        offset += view.getUint16(offset, false);
      }
    }
    return callback(-1);
  };
  reader.readAsArrayBuffer(file);
}

function resetOrientation(
  srcBase64: string,
  srcOrientation: number,
  callback: (data: string) => void,
  compressionFlag: boolean
) {
  const img = new Image();

  img.onload = () => {
    const width = img.width;
    const height = img.height;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // If we can't get a context, let's leave with what we came in with.
    if (ctx === null) {
      callback(srcBase64);
      return;
    }

    // set proper canvas dimensions before transform & export
    if (4 < srcOrientation && srcOrientation < 9) {
      canvas.width = height;
      canvas.height = width;
    } else {
      canvas.width = width;
      canvas.height = height;
    }

    // transform context before drawing image
    switch (srcOrientation) {
      case 2:
        ctx.transform(-1, 0, 0, 1, width, 0);
        break;
      case 3:
        ctx.transform(-1, 0, 0, -1, width, height);
        break;
      case 4:
        ctx.transform(1, 0, 0, -1, 0, height);
        break;
      case 5:
        ctx.transform(0, 1, 1, 0, 0, 0);
        break;
      case 6:
        ctx.transform(0, 1, -1, 0, height, 0);
        break;
      case 7:
        ctx.transform(0, -1, -1, 0, height, width);
        break;
      case 8:
        ctx.transform(0, -1, 1, 0, 0, width);
        break;
      default:
        if (compressionFlag === false) {
          callback(srcBase64);
          return;
        }
        break;
    }

    // draw image
    ctx.drawImage(img, 0, 0);

    // export base64
    callback(canvas.toDataURL("image/jpeg", compressionStrength));
  };

  img.src = srcBase64;
}

export function doIBeCompressing(options: IOptions): boolean {
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

  return options.file.size > options.compressWhenAboveFileSize;
}
