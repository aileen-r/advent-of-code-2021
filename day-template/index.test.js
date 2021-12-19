import { dayTemplate, dayTemplatePart2 } from './index.js';

const testData = [];

it('Part 1:', () => {
  const part1Result = dayTemplate(testData);
  expect(part1Result).toEqual(undefined);
});

it('Part 2:', () => {
  const part2Result = dayTemplatePart2(testData);
  expect(part2Result).toEqual(undefined);
});
