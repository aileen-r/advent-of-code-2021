import * as fs from 'fs';

const txtFileLinesToArray = filepath =>
  fs.readFileSync(filepath).toString().split('\n');

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

const run = () => {
  const filepath = './data/challenge.txt';
  const measurements = txtFileLinesToArray(filepath).map(line =>
    parseInt(line, 10)
  );
  const increaseCount = countDepthMeasurementIncreases(measurements);
  console.log({ increaseCount });
};

run();

export { countDepthMeasurementIncreases };
