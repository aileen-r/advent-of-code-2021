import { day06, day06Part2 } from './index.js';

const testData = ['3, 4, 3, 1, 2', ''];

it('Part 1:', () => {
  const part1Result = day06(testData);
  expect(part1Result).toEqual(5934);
});

it('Part 2:', () => {
  const part2Result = day06Part2(testData);
  expect(part2Result).toEqual(undefined);
});
