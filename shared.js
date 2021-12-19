import * as fs from 'fs';

const txtFileLinesToArray = filepath =>
  fs
    .readFileSync(filepath)
    .toString()
    .split('\n')
    .filter(x => x);

export { txtFileLinesToArray };
