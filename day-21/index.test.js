import { day21, day21Part2 } from './index.js';

const testData = [4, 8]; // player starting positions

it('Part 1:', () => {
  const part1Result = day21(testData);
  expect(part1Result).toEqual(739785);
});

it('Part 2:', () => {
  const part2Result = day21Part2(testData);
  expect(part2Result).toEqual(undefined);
});
