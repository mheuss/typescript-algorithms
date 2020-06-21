import {ErrorCodes} from "../constants";
// tslint:disable:no-bitwise

export class BitMasks {
  private mask: number;

  /**
   * Accepts either a string of bits, or an integer.
   * @param {string | number} initialMaskValue
   */
  constructor (initialMaskValue: number| string)
  {
    this.mask = (typeof initialMaskValue ==="string") ? parseInt(initialMaskValue, 2) : initialMaskValue;
  }

  /**
   * Returns the mask as an integer
   */
  public get=()=>{
    return this.mask;
  }

  /**
   * Returns the mask as a string of 1s and 0s
   */
  public toString=(): string=>{
    return (this.mask >>>0).toString(2);
  }

  /**
   * Sets a given bit
   * @param {number} bit
   * @returns {boolean} True if is on, otherwise false
   * @throws If bit is less than 0 or greater then 31.
   */
  public isOn=(bit: number): boolean=>{
    this.bitCheck(bit);

    return (this.mask & (1<<bit))>0;
  }

  /**
   * Sets a given bit
   * @param {number} bit
   * @throws If bit is less than 0 or greater then 31.
   */
  public setBit=(bit: number)=>{
    this.bitCheck(bit);

    this.mask |=(1<<bit);
  }

  /**
   * Flips the given bit - if 1, then sets it to zero. Otherwise sets it to 1.
   * @param bit
   * @throws If bit is less than 0 or greater then 31.
   */
  public flipBit=(bit: number)=>{
    this.bitCheck(bit);

    this.mask ^= (1<<bit);
  };

  /**
   * Return the lowest bit. If none exists, returns a negative one.
   * @returns {number} Position of the rightmost bit that is turned on.
   */
  public lowBit =(): number=>{
    const bitAsString = this.toString().split("").reverse().join("");
    return bitAsString.indexOf('1');
  }

  /**
   * Sets {positions} number of bits from right to left.
   * @param {number} positions
   * @throws If bit is less than 0 or greater then 31.
   */
  public setAll=(positions: number)=>{
    this.bitCheck(positions);
    this.mask = (1<<positions)-1;
  };

  /**
   * Modulo comparison done with bitwise operations
   * @param bit
   */
  public modulo=(bit:number): number=>{
    if (bit<=0 || bit>31 || bit < 0) {
      throw {code: ErrorCodes.OPERATION_BEYOND_BOUNDS, message: `We can't work with bit ${bit}. Must be greater than 0, less than 31`};
    }

    const powerOfTwo = Math.pow(2, bit);
    return (this.mask & (powerOfTwo-1));
  };

  public isPowerOfTwo=(): boolean=>{
    return (!(this.mask & (this.mask-1)));
  }

  private bitCheck=(bit: number)=>{
    if (bit>31 || bit < 0) {
      throw {code: ErrorCodes.OPERATION_BEYOND_BOUNDS, message: `We can't work with bit ${bit}. Must be between 0 and 31`};
    }

    return;
  }
}
