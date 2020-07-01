/**
 * Takes a single array and returns it split into n arrays.
 * @param {Array<any>} incomingArray we want to split evenly as possible.
 * @param {number} numberOfArrays Number of parts we want to split it into.
 * @returns {Array<Array<any>>} Array of arrays, with each sub array representing a split chunk.
 */

export function divideArrayIntoColumns(
  incomingArray: any[],
  numberOfArrays: number
) {
  if (numberOfArrays < 2) {
    return [incomingArray];
  }

  const lengthOfArray = incomingArray.length;
  const outputArray: any[] = [];
  let eachChunk;
  let currentIncrement = 0;

  if (lengthOfArray % numberOfArrays === 0) {
    // Are we evenly dividable?
    eachChunk = Math.floor(lengthOfArray / numberOfArrays);
    while (currentIncrement < lengthOfArray) {
      outputArray.push(
        incomingArray.slice(currentIncrement, (currentIncrement += eachChunk))
      );
    }
  } else {
    // Otherwise, do the best we can of it
    while (currentIncrement < lengthOfArray) {
      eachChunk = Math.ceil(
        (lengthOfArray - currentIncrement) / numberOfArrays--
      );
      outputArray.push(
        incomingArray.slice(currentIncrement, (currentIncrement += eachChunk))
      );
    }
  }

  return outputArray;
}
