import { BitMasks } from './index';

describe('Bitwise Manipulation', () => {
  it('Check to see if a bit is on - should return false', () => {
    const bitmask = new BitMasks(32);
    expect(bitmask.isOn(0)).toBeFalsy();
  });

  it('Check to see if a bit is on - should return true', () => {
    const bitmask = new BitMasks(32);
    expect(bitmask.isOn(5)).toBeTruthy();
  });

  it('Should turn a given bit on', () => {
    const bitmask = new BitMasks(32);
    bitmask.setBit(5);
    expect(bitmask.get()).toEqual(32);
  });

  it('Should flip a given bit', () => {
    const bitmask = new BitMasks(32);
    bitmask.flipBit(4);
    expect(bitmask.get()).toEqual(48);
    bitmask.flipBit(4);
    expect(bitmask.get()).toEqual(32);
  });

  it('Should return a bit mask as a string', () => {
    const bitmask = new BitMasks(50);
    expect(bitmask.toString()).toEqual('110010');
  });

  it('Should return the low bit', () => {
    const bitmask = new BitMasks(50);
    expect(bitmask.lowBit()).toEqual(1);
    expect(bitmask.get()).toEqual(50);
  });

  it('Should return -1 there is no low bit', () => {
    const bitmask = new BitMasks(0);
    expect(bitmask.lowBit()).toEqual(-1);
  });

  describe('Set a number of bits, right to left', () => {
    it('Should set all given bits', () => {
      const bitmask = new BitMasks(0);
      bitmask.setAll(5);
      expect(bitmask.toString()).toEqual('11111');
    });

    it('Should set all given bits', () => {
      const bitmask = new BitMasks(0);
      bitmask.setAll(31);
      expect(bitmask.toString()).toEqual('1111111111111111111111111111111');
    });

    it('Should give us an array of set bits in integer form', ()=>{
      const bitmask = new BitMasks(16908544);
      expect(bitmask.integerValuesOfSetBits()).toEqual([256, 131072, 16777216]);
    })


    it('Should throw if we try to set too many', () => {
      const bitmask = new BitMasks(0);
      expect(() => bitmask.setAll(95)).toThrowErrorMatchingSnapshot();
    });

    it('Should throw if we try to set a negative value', () => {
      const bitmask = new BitMasks(0);
      expect(() => bitmask.setAll(-95)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('Modulo', () => {
    it('Should return an expected modulo value', () => {
      const bitmask = new BitMasks(9);
      expect(bitmask.modulo(2)).toEqual(1);
    });

    it('Should return an expected modulo value', () => {
      const bitmask = new BitMasks(9);
      expect(bitmask.modulo(16)).toEqual(9);
    });

    it('Should throw if we try to get a modulo on an invalid value', () => {
      const bitmask = new BitMasks(9);
      expect(() => bitmask.modulo(-95)).toThrowErrorMatchingSnapshot();
    });

    it('Should throw if we try to get a modulo on an invalid value', () => {
      const bitmask = new BitMasks(9);
      expect(() => bitmask.modulo(0)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('Is power of two', () => {
    it('Should return true if value is a power of two', () => {
      const bitmask = new BitMasks(8);
      expect(bitmask.isPowerOfTwo()).toBeTruthy();
    });

    it('Should return false if it aint', () => {
      const bitmask = new BitMasks(18);
      expect(bitmask.isPowerOfTwo()).toBeFalsy();
    });
  });
});
