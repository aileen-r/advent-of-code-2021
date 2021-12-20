import { txtFileLinesToArray } from '../shared.js';

/*
 * 7 segment display reference
 *
 *  aaaa
 * b    c
 * b    c
 *  dddd
 * e    f
 * e    f
 *  gggg
 */

const numSegmentsMap = {
  2: [1],
  3: [7],
  4: [4],
  5: [2, 3, 5],
  6: [0, 6, 9],
  7: [8],
};

const day08 = input => {
  const outputs = input
    .filter(e => e)
    .map(e => e.split(' | ')[1])
    .map(r => r.split(/\s+/))
    .flat();

  const knownSegmentLengths = Object.keys(numSegmentsMap)
    .filter(key => numSegmentsMap[key].length === 1)
    .map(k => parseInt(k, 10));

  const count1s4s7s8s = outputs.reduce(
    (acc, curr) => (knownSegmentLengths.includes(curr.length) ? acc + 1 : acc),
    0
  );
  return count1s4s7s8s;
};

const day08Part2 = input => {
  return undefined;
};

const run = () => {
  const data = txtFileLinesToArray('./day-08/data/challenge.txt');

  // Part 1
  const part1Result = day08(data);
  console.log('Part 1 answer:');
  console.log({ part1Result });

  // Part 2
  const part2Result = day08Part2(data);
  console.log('\n');
  console.log('Part 2 answer:');
  console.log({ part2Result });
};

run();

export { day08, day08Part2 };
