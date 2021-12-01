
import run from './index.js';
const consoleSpy = jest.spyOn(console, 'log');

it("returns 'hello world'", () => {
  run();
  expect(consoleSpy).toHaveBeenCalledWith('hello world');
})