import { countDepthMeasurementIncreases } from './index.js';

const testData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

it("calculates correct no. increases from example data", () => {
  const increaseCount = countDepthMeasurementIncreases(testData);
  expect(increaseCount).toEqual(7);
});
