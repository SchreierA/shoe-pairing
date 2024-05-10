export function generatePossibleGameSizes(): number[] {
  return Array.from({ length: 8 }).map((_, index) => (index + 3) * 2);
}
