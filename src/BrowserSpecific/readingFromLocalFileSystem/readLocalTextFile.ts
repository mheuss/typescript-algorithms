/**
 * When in a browser, this reads a text based file from the local file system.
 * @param {File} file Javascript file object to be read in as string.
 * @returns {Promise<string>} Returns a promise that will resolve to a string containing the contents of the file in question.
 */

export function readLocalTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const contents = fileReader.result;
      resolve(contents as string);
    };
    fileReader.onerror = (e) => {
      reject(e);
    };
    fileReader.readAsText(file);
  });
}
