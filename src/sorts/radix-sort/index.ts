class RadixSort {
  private workingArray: number[] = [];
  private maximumNumberOfDigits: number = 0;

  public go = (incomingArray: number[]) => {
    this.workingArray = incomingArray;

    this.maximumNumberOfDigits = 0;
    let counter = this.workingArray.length;
    while (counter--) {
      this.maximumNumberOfDigits = Math.max(
        this.maximumNumberOfDigits,
        this.workingArray[counter] === 0
          ? 1
          : Math.floor(Math.log10(Math.abs(this.workingArray[counter]))) + 1
      );
    }

    this.sort();

    return this.workingArray;
  };

  private sort = () => {
    for (let counter = 0; counter < this.maximumNumberOfDigits; counter++) {
      const buckets: number[][] = Array.from(
        { length: 10 },
        (): number[] => []
      );
      for (const item of this.workingArray) {
        const digit = this.getDigit(item, counter);
        buckets[digit].push(item);
      }
      this.workingArray = ([] as number[]).concat(...buckets);
    }

    return;
  };

  private getDigit = (num: number, index: number) => {
    return Math.floor(Math.abs(num) / Math.pow(10, index)) % 10;
  };
}

const radixSort = new RadixSort().go;

export default radixSort;
