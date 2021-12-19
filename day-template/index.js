import { txtFileLinesToArray } from '../shared';

const dayTemplate = input => {
  return undefined;
};

const dayTemplatePart2 = input => {
  return undefined;
};

const run = () => {
  const data = txtFileLinesToArray('./day-template/data/challenge.txt');

  // Part 1
  const part1Result = dayTemplate(data);
  console.log('Part 1 answer:');
  console.log({ part1Result });

  // Part 2
  const part2Result = dayTemplatePart2(data);
  console.log('\n');
  console.log('Part 2 answer:');
  console.log({ part2Result });
};

run();

export { dayTemplate, dayTemplatePart2 };
