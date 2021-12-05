import {txtFileLinesToArray} from '../shared.js';

const countDepthMeasurementIncreases = measurements => {
  let prev;
  return measurements.reduce((acc, curr) => {
    if (prev && curr > prev) {
      acc++;
    }
    prev = curr;
    return acc;
  }, 0);
};

const countSlidingWindowIncreases = (measurements, window = 3) => {
  let prevSum;
  return measurements.reduce((acc, curr, idx) => {
    const currSum = measurements
      .slice(idx, window + idx)
      .reduce((a, c) => a + c);
    if (prevSum && currSum > prevSum) {
      acc++;
    }
    prevSum = currSum;
    return acc;
  }, 0);
};

const run = () => {
  // Part 1
  const filepath = './day-01/data/challenge.txt';
  const measurements = txtFileLinesToArray(filepath).map(line =>
    parseInt(line, 10)
  );
  const increaseCount = countDepthMeasurementIncreases(measurements);
  console.log('Part 1 answer:');
  console.log({ increaseCount });

  // Part 2
  const slidingWindowIncreaseCount = countSlidingWindowIncreases(measurements);
  console.log('\n');
  console.log('Part 2 answer:');
  console.log({ slidingWindowIncreaseCount });
};

run();

export { countDepthMeasurementIncreases, countSlidingWindowIncreases };
