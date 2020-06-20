import radixSort from './index';

describe('Radix Sort', () => {
  it('Should return a sorted array of integers', () => {
    const sorted = radixSort([
      8000,
      4000,
      6000,
      5000,
      30,
      45,
      87,
      123,
      7647,
      342,
      6,
    ]);
    expect(sorted).toEqual([
      6,
      30,
      45,
      87,
      123,
      342,
      4000,
      5000,
      6000,
      7647,
      8000,
    ]);
  });
});
