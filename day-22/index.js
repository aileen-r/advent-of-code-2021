import { txtFileLinesToArray } from '../shared.js';

// https://regex101.com/r/Fulan8/1
const COORD_REGEX = /x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/;
const INIT_PROCEDURE_LIMIT = 50;

const day22 = input => {
  const getCubesFromCoords = ([x1, x2, y1, y2, z1, z2]) => {
    // This assumes n1 < n2
    const cubes = [];
    for (let x = x1; x <= x2; x++) {
      if (Math.abs(x) > INIT_PROCEDURE_LIMIT) continue;
      for (let y = y1; y <= y2; y++) {
        if (Math.abs(y) > INIT_PROCEDURE_LIMIT) continue;
        for (let z = z1; z <= z2; z++) {
          if (Math.abs(z) > INIT_PROCEDURE_LIMIT) continue;
          cubes.push([x, y, z]);
        }
      }
    }
    return cubes;
  };

  const parseInput = input => {
    const parsedData = [];
    input.forEach(line => {
      if (line) {
        const [onOffString, coordinateString] = line.split(/\s+/);
        const on = onOffString === 'on';
        const coords = coordinateString
          .match(COORD_REGEX)
          .slice(1, 7)
          .map(c => parseInt(c, 10));
        const cubes = getCubesFromCoords(coords);
        if (cubes.length) {
          parsedData.push({
            on,
            cubes,
          });
        }
      }
    });
    return parsedData;
  };

  const steps = parseInput(input);
  const onCubes = new Set();
  steps.forEach(step => {
    if (step.on) {
      step.cubes.forEach(cube => onCubes.add(cube.join()));
    } else {
      step.cubes.forEach(cube => onCubes.delete(cube.join()));
    }
  });

  return onCubes.size;
};

const day22Part2 = input => {
  return undefined;
};

const run = () => {
  const data = txtFileLinesToArray('./day-22/data/challenge.txt');

  // Part 1
  const part1Result = day22(data);
  console.log('Part 1 answer:');
  console.log({ part1Result });

  // Part 2
  const part2Result = day22Part2(data);
  console.log('\n');
  console.log('Part 2 answer:');
  console.log({ part2Result });
};

run();

export { day22, day22Part2 };
