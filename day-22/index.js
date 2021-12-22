import { txtFileLinesToArray } from '../shared.js';

// https://regex101.com/r/Fulan8/1
const COORD_REGEX = /x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/;
const INIT_PROCEDURE_LIMIT = 50;

// https://github.com/nodejs/node/issues/37320#issuecomment-851788923
class SuperSet {
  constructor() {
    this.sets = [new Set()];
  }

  add(v) {
    if (this.sets[this.sets.length - 1].size === 16777000)
      this.sets.push(new Set());
    return this.sets[this.sets.length - 1].add(v);
  }

  has(v) {
    for (const set of this.sets) {
      if (set.has(v)) return true;
    }
    return false;
  }

  // my additions
  get size() {
    return this.sets.reduce((acc, curr) => acc + curr.size, 0);
  }

  delete(v) {
    for (const set of this.sets) {
      if (set.has(v)) {
        set.delete(v);
        return true;
      }
    }
    return false;
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
const setUnion = (setA, setB) => {
  let _union = new Set(setA);
  for (let elem of setB) {
    _union.add(elem);
  }
  return _union;
};
const setDifference = (setA, setB) => {
  let _difference = new Set(setA);
  for (let elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
};

const superSetUnion = (setA, setB) => {
  let _union = new SuperSet(setA);
  setB.sets.forEach(set => {
    for (let elem of set) {
      _union.add(elem);
    }
  });

  return _union;
};
const superSetDifference = (setA, setB) => {
  let _difference = new SuperSet(setA);
  setB.sets.forEach(set => {
    for (let elem of set) {
      _difference.delete(elem);
    }
  });

  return _difference;
};

const union = (setA, setB, superSet) =>
  superSet ? superSetUnion(setA, setB) : setUnion(setA, setB);

const difference = (setA, setB, superSet) =>
  superSet ? superSetDifference(setA, setB) : setDifference(setA, setB);

const getCubesFromCoords = ([x1, x2, y1, y2, z1, z2], initProcedure) => {
  // This assumes n1 < n2
  const cubes = initProcedure ? new Set() : new SuperSet();
  for (let x = x1; x <= x2; x++) {
    if (initProcedure && Math.abs(x) > INIT_PROCEDURE_LIMIT) continue;
    for (let y = y1; y <= y2; y++) {
      if (initProcedure && Math.abs(y) > INIT_PROCEDURE_LIMIT) continue;
      for (let z = z1; z <= z2; z++) {
        if (initProcedure && Math.abs(z) > INIT_PROCEDURE_LIMIT) continue;
        cubes.add([x, y, z].join());
      }
    }
  }
  return cubes;
};

const parseInput = (input, initProcedure) => {
  const parsedData = [];
  input.forEach(line => {
    if (line) {
      const [onOffString, coordinateString] = line.split(/\s+/);
      const on = onOffString === 'on';
      const coords = coordinateString
        .match(COORD_REGEX)
        .slice(1, 7)
        .map(c => parseInt(c, 10));
      const cubes = getCubesFromCoords(coords, initProcedure);
      if (cubes.size) {
        parsedData.push({
          on,
          cubes,
        });
      }
    }
  });
  return parsedData;
};

const runRebootSteps = (input, initProcedure = false) => {
  const steps = parseInput(input, initProcedure);
  let onCubes = initProcedure ? new Set() : new SuperSet();
  steps.forEach(step => {
    if (step.on) {
      onCubes = union(onCubes, step.cubes, !initProcedure);
    } else {
      onCubes = difference(onCubes, step.cubes, !initProcedure);
    }
  });
  return onCubes.size;
};

const day22 = input => {
  return runRebootSteps(input, true);
};

const day22Part2 = () => {
  const data = txtFileLinesToArray('./day-22/data/example2.txt');
  return runRebootSteps(data);
};

const run = () => {
  const data = txtFileLinesToArray('./day-22/data/challenge.txt');

  // Part 1
  const part1Result = day22(data);
  console.log('Part 1 answer:');
  console.log({ part1Result });

  // Part 2
  const part2Result = day22Part2();
  console.log('\n');
  console.log('Part 2 answer:');
  console.log({ part2Result });
};

run();

export { day22, day22Part2 };
