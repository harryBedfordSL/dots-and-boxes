/**
 * Get a random number between min (inclusive) and max (inclusive)
 */
export const getRandomInt = (min: number, max: number): number => {
  const minAdjusted = Math.ceil(min);
  const maxAdjusted = Math.floor(max);
  return Math.floor(Math.random() * (maxAdjusted - minAdjusted + 1)) + minAdjusted;
};
