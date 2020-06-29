/**
 * Reads a DataURL string from a file on the local file system.
 * @param {File} file Javascript file object to be read in as DataURL
 * @returns {Promise<string>} Returns a promise that will resolve to a string containing the contents of the file in question.
 */

export async function readLocalFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const imageFile = new FileReader();
    imageFile.onload = () => {
      const contents = imageFile.result;
      resolve(contents as string);
    };
    imageFile.onerror = e => {
      /* istanbul ignore next */
      reject(e);
    };

    imageFile.readAsDataURL(file);
  });
}
