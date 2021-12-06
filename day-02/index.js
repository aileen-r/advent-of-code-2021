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
    console.log(direction, unit);
    switch (direction) {
      case 'up':
        position.depth = position.depth - unit;
        break;
      case 'down':
        position.depth = position.depth + unit;
        break;
      case 'forward':
        position.horizontal = position.horizontal + unit;
        break;
    }
  };

  const steps = parseInputIntoSteps(input);
  steps.forEach(processStep);
  return position.horizontal * position.depth;
};

const run = () => {
  const data = txtFileLinesToArray('./day-02/data/challenge.txt');
  const finalProduct = day02(data);
  console.log({ finalProduct });
};

run();

export { day02 };
