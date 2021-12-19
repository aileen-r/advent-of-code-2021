import { txtFileLinesToArray } from '../shared.js';

const day03 = input => {
  const noOfCols = input[0].length;
  const countOf1sPerColumn = new Array(noOfCols).fill(0);
  input.forEach(line => {
    line.split('').forEach((digit, idx) => {
      if (digit === '1') {
        countOf1sPerColumn[idx]++;
      }
    });
  });
  const binaryGammaRateString = countOf1sPerColumn.reduce(
    (acc, curr) => acc + (curr < input.length / 2 ? '0' : '1'),
    ''
  );
  const binaryEpsilonRateString = binaryGammaRateString
    .split('')
    .map(digit => (digit === '1' ? '0' : '1'))
    .join('');
  const decimalGammaRate = parseInt(binaryGammaRateString, 2);
  const decmialEpsilonRate = parseInt(binaryEpsilonRateString, 2);
  return decimalGammaRate * decmialEpsilonRate;
};

const run = () => {
  const data = txtFileLinesToArray('./day-03/data/challenge.txt');
  const result = day03(data);
  console.log({ result });
};

run();

export { day03 };
