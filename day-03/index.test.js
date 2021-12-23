import { day03, day03Part2 } from './index.js';

const testData = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
];

it('Part 1: calculates correct product of gamma and epsilon rate', () => {
  const finalProduct = day03(testData);
  expect(finalProduct).toEqual(198);
});

it('Part 1: calculates correct product of life support rating', () => {
  const finalProduct = day03Part2(testData);
  expect(finalProduct).toEqual(230);
});
