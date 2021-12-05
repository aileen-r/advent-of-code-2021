import {txtFileLinesToArray} from '../shared.js';

const parseInput = data => {
  return data.map(x => ({
    direction: x.match(/[A-Za-z]+/)[0],
    unit: parseInt(x.match(/\d+/)[0], 10)
  }))
}

const run = () => {
  const data = txtFileLinesToArray('./day-02/data/challenge.txt');
  const parsed = parseInput(data);
  console.log(parsed);
};

run();