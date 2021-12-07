import { txtFileLinesToArray } from '../shared.js';

const day02 = input => {
  const position = {
    horizontal: 0,
    depth: 0,
  };

  const parseInputIntoSteps = data => {
    return data.map(x => ({
      direction: x.match(/[A-Za-z]+/)[0],
      unit: parseInt(x.match(/\d+/)[0], 10),
    }));
  };

  const processStep = ({ direction, unit }) => {
    switch (direction) {
      case 'up':
        position.depth -= unit;
        break;
      case 'down':
        position.depth += unit;
        break;
      case 'forward':
        position.horizontal += unit;
        break;
    }
  };

  const steps = parseInputIntoSteps(input);
  steps.forEach(processStep);
  return position.horizontal * position.depth;
};

const day02Part2 = input => {
  const position = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };

  const parseInputIntoSteps = data => {
    return data.map(x => ({
      direction: x.match(/[A-Za-z]+/)[0],
      unit: parseInt(x.match(/\d+/)[0], 10),
    }));
  };

  const processStep = ({ direction, unit }) => {
    switch (direction) {
      case 'up':
        position.aim -= unit;
        break;
      case 'down':
        position.aim += unit;
        break;
      case 'forward':
        position.horizontal += unit;
        position.depth += position.aim * unit;
        break;
    }
  };

  const steps = parseInputIntoSteps(input);
  steps.forEach(processStep);
  return position.horizontal * position.depth;
};

const run = () => {
  const data = txtFileLinesToArray('./day-02/data/challenge.txt');

  // Part 1
  const finalProduct = day02(data);
  console.log('Part 1 answer:');
  console.log({ finalProduct });

  // Part 2
  const finalProductPart2 = day02Part2(data);
  console.log('\n');
  console.log('Part 2 answer:');
  console.log({ finalProduct: finalProductPart2 });
};

run();

export { day02, day02Part2 };
