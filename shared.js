import * as fs from 'fs';

const txtFileLinesToArray = filepath =>
  fs.readFileSync(filepath).toString().split('\n');

export { txtFileLinesToArray };
