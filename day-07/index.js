import { txtFileLinesToArray } from '../shared.js';

const mean = numArray => numArray.reduce((a, b) => a + b) / numArray.length;

const day07 = input => {
  const calculateMeanDistanceFromPosition = (position, positions) =>
    mean(positions.map(p => Math.abs(p - position)));

  const positions = input[0].split(',').map(p => parseInt(p, 10));
  const highestPos = positions.reduce(
    (acc, curr) => (curr > acc ? curr : acc),
    0
  );
  let optimalPosition, lowestMeanDistance;
  for (let i = 0; i <= highestPos; i++) {
    const meanDistance = calculateMeanDistanceFromPosition(i, positions);
    if (!lowestMeanDistance || meanDistance < lowestMeanDistance) {
      lowestMeanDistance = meanDistance;
      optimalPosition = i;
    }
  }
  const fuelCost = positions.reduce(
    (prev, curr) => Math.abs(curr - optimalPosition) + prev,
    0
  );

  return fuelCost;
};

const day07Part2 = input => {
  return undefined;
};

const run = () => {
  const data = txtFileLinesToArray('./day-07/data/challenge.txt');

  // Part 1
  const part1Result = day07(data);
  console.log('Part 1 answer:');
  console.log({ part1Result });

  // Part 2
  const part2Result = day07Part2(data);
  console.log('\n');
  console.log('Part 2 answer:');
  console.log({ part2Result });
};

run();

export { day07, day07Part2 };
