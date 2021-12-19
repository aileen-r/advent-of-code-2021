import { txtFileLinesToArray } from '../shared.js';

const SEPARATOR = ' -> ';

const day05 = input => {
  const getLineCoordinatesFromInput = input =>
    input
      .filter(x => x)
      .map(line =>
        line
          .split(SEPARATOR)
          .map(point => point.split(',').map(coord => parseInt(coord, 10)))
      );

  const drawLineOntoDiagram = (line, diagram) => {
    const staticIdx = line[0][0] === line[1][0] ? 0 : 1;
    const staticVal = line[0][staticIdx];
    const changingIdx = staticIdx === 1 ? 0 : 1;
    let [start, end] = line.map(point => point[changingIdx]);
    if (start > end) {
      // swap values
      [start, end] = [end, start];
    }

    for (let i = start; i <= end; i++) {
      const x = staticIdx === 0 ? staticVal : i;
      const y = staticIdx === 0 ? i : staticVal;

      if (!diagram[y]) {
        diagram[y] = [];
      }

      diagram[y][x] = diagram[y][x] ? diagram[y][x] + 1 : 1;
    }
  };

  const countOverlaps = diagram =>
    diagram.flat(2).reduce((acc, curr) => acc + (curr > 1 ? 1 : 0), 0);

  const lineCoordinates = getLineCoordinatesFromInput(input);
  const horizontalVerticalLineCoords = lineCoordinates.filter(
    line => line[0][0] === line[1][0] || line[0][1] === line[1][1]
  );

  const diagram = [];
  horizontalVerticalLineCoords.forEach(line =>
    drawLineOntoDiagram(line, diagram)
  );

  const totalOverlaps = countOverlaps(diagram);

  return totalOverlaps;
};

const day05Part2 = input => {
  return undefined;
};

const run = () => {
  const data = txtFileLinesToArray('./day-05/data/challenge.txt');

  // Part 1
  const part1Result = day05(data);
  console.log('Part 1 answer:');
  console.log({ part1Result });

  // Part 2
  const part2Result = day05Part2(data);
  console.log('\n');
  console.log('Part 2 answer:');
  console.log({ part2Result });
};

run();

export { day05, day05Part2 };
