export function generatePossibleGameSizes(): number[] {
  return Array.from({ length: 8 }).map((_, index) => (index + 3) * 2);
}

/**
 * @param amount the size of the subset we want to be returned - hopefully lower than 10
 * @returns a random subset of the numbers below 10 in a random order
 */
export function generateGivenAmountUniqueRandomNumbers(
  amount: number
): number[] {
  const numbers: number[] = [];
  while (numbers.length < amount) {
    const randomNum = Math.floor(Math.random() * 10);
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }
  return numbers;
}

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
