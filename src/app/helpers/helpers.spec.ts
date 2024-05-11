import {
  generateGivenAmountUniqueRandomNumbers,
  generatePossibleGameSizes,
} from './helpers';

describe('helpers', () => {
  it('generatePossibleGameSizes returns an array with the proper values', () => {
    expect(generatePossibleGameSizes()).toEqual([6, 8, 10, 12, 14, 16, 18, 20]);
  });

  it('generateGivenAmountUniqueRandomNumbers return the correct amount of numbers', () => {
    expect(generateGivenAmountUniqueRandomNumbers(7).length).toBe(7);
  });
});
