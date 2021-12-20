import { day07, day07Part2 } from './index.js';

const testData = ['16, 1, 2, 0, 4, 2, 7, 1, 2, 14', ''];

it('Part 1:', () => {
  const part1Result = day07(testData);
  expect(part1Result).toEqual(37);
});

it('Part 2:', () => {
  const part2Result = day07Part2(testData);
  expect(part2Result).toEqual(undefined);
});
