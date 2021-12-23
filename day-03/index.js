import { txtFileLinesToArray } from '../shared.js';

const getCountOf1sPerColumn = input => {
  const noOfCols = input[0].length;
  const countOf1sPerColumn = new Array(noOfCols).fill(0);
  input.forEach(line => {
    line.split('').forEach((digit, idx) => {
      if (digit === '1') {
        countOf1sPerColumn[idx]++;
      }
    });
  });
  return countOf1sPerColumn;
};

const day03 = input => {
  const countOf1sPerColumn = getCountOf1sPerColumn(input);
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

const day03Part2 = input => {
  let o2GenCriteriaMatch = input.filter(x => x);
  let co2ScrubCriteriaMatch = input.filter(x => x);

  for (let col = 0; col < input[0].length; col++) {
    if (o2GenCriteriaMatch.length > 1) {
      const countOf1sInO2Col = getCountOf1sPerColumn(o2GenCriteriaMatch)[col];
      const o2BitCriteria =
        o2GenCriteriaMatch.length / 2 <= countOf1sInO2Col ? '1' : '0';

      o2GenCriteriaMatch = o2GenCriteriaMatch.filter(
        m => m[col] === o2BitCriteria
      );
    }
    if (co2ScrubCriteriaMatch.length > 1) {
      const countOf1sInCo2Col = getCountOf1sPerColumn(co2ScrubCriteriaMatch)[
        col
      ];
      const co2BitCriteria =
        co2ScrubCriteriaMatch.length / 2 > countOf1sInCo2Col ? '1' : '0';

      co2ScrubCriteriaMatch = co2ScrubCriteriaMatch.filter(
        m => m[col] === co2BitCriteria
      );
    }

    if (o2GenCriteriaMatch.length === 1 && co2ScrubCriteriaMatch === 1) {
      break;
    }
  }

  return (
    parseInt(o2GenCriteriaMatch[0], 2) * parseInt(co2ScrubCriteriaMatch, 2)
  );
};

const run = () => {
  const data = txtFileLinesToArray('./day-03/data/challenge.txt');
  // Part 1
  const part1Result = day03(data);
  console.log('Part 1 answer:');
  console.log({ part1Result });

  // Part 2
  const part2Result = day03Part2(data);
  console.log('\n');
  console.log('Part 2 answer:');
  console.log({ part2Result });
};

run();

export { day03, day03Part2 };
