import { day02, day02Part2 } from './index.js';

const testData = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2',
];

it('Part 1: calculates correct product of position and depth from example', () => {
  const finalProduct = day02(testData);
  expect(finalProduct).toEqual(150);
});

it('Part 2: calculates correct product of position and depth from example', () => {
  const finalProduct = day02Part2(testData);
  expect(finalProduct).toEqual(900);
});
