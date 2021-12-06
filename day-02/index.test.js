import { expect } from '@jest/globals';
import { day02 } from './index.js';

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
