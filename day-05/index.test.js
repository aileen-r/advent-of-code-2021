import { day05, day05Part2 } from './index.js';

const testData = [
  '0,9 -> 5,9',
  '8,0 -> 0,8',
  '9,4 -> 3,4',
  '2,2 -> 2,1',
  '7,0 -> 7,4',
  '6,4 -> 2,0',
  '0,9 -> 2,9',
  '3,4 -> 1,4',
  '0,0 -> 8,8',
  '5,5 -> 8,2',
  '',
];

it('Part 1:', () => {
  const part1Result = day05(testData);
  expect(part1Result).toEqual(5);
});

it('Part 2:', () => {
  const part2Result = day05Part2(testData);
  expect(part2Result).toEqual(undefined);
});
