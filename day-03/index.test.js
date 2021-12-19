import { expect } from '@jest/globals';
import { day03 } from './index.js';

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
