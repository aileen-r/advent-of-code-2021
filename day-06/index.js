import { txtFileLinesToArray } from '../shared.js';

const DAYS_COUNT = 80;

const day06 = input => {
  // I need a pluralisation, alright?!
  let fishies = input[0].split(',').map(fish => parseInt(fish, 10));

  for (let i = 0; i < DAYS_COUNT; i++) {
    const newFishies = [...fishies];
    fishies.forEach((fish, idx) => {
      if (fish === 0) {
        newFishies.push(8);
        newFishies[idx] = 6;
      } else {
        newFishies[idx] = fish - 1;
      }
    });
    fishies = newFishies;
  }

  return fishies.length;
};

const day06Part2 = input => {
  return undefined;
};

const run = () => {
  const data = txtFileLinesToArray('./day-06/data/challenge.txt');

  // Part 1
  const part1Result = day06(data);
  console.log('Part 1 answer:');
  console.log({ part1Result });

  // Part 2
  const part2Result = day06Part2(data);
  console.log('\n');
  console.log('Part 2 answer:');
  console.log({ part2Result });
};

run();

export { day06, day06Part2 };
