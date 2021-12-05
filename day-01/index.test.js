import {
  countDepthMeasurementIncreases,
  countSlidingWindowIncreases,
} from './index.js';

const testData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

it('Part 1: calculates correct no. increases from example data', () => {
  const increaseCount = countDepthMeasurementIncreases(testData);
  expect(increaseCount).toEqual(7);
});

it('Part 2: calculates correct sliding window no. increases from example data', () => {
  const slidingWindowIncreaseCount = countSlidingWindowIncreases(testData);
  expect(slidingWindowIncreaseCount).toEqual(5);
});
