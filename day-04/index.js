import { txtFileLinesToArray } from '../shared.js';

// Bingo boards are all 5x5 matrices
const MATRIX_ROW_LENGTH = 5;
const MARKER = 'X';

const day04 = input => {
  const getDrawnNumbersFromInput = input =>
    input[0].split(',').map(i => parseInt(i, 10));

  const getBingoBoardsFromInput = input => {
    const boardsInput = input.slice(2, -1);
    const boards = [];
    let currentBoard = [];
    boardsInput.forEach(row => {
      if (row.length) {
        currentBoard.push(
          ...row
            .trim()
            .split(/\s+/)
            .map(i => parseInt(i, 10))
        );
      }
      if (currentBoard.length === MATRIX_ROW_LENGTH ** 2) {
        boards.push(currentBoard);
        currentBoard = [];
      }
    });
    return boards;
  };

  const getBoardRows = board => {
    const rows = [];
    for (let i = 0; i < board.length; i += MATRIX_ROW_LENGTH) {
      rows.push(board.slice(i, i + MATRIX_ROW_LENGTH));
    }
    return rows;
  };

  const getBoardColumns = board => {
    const cols = [];
    for (let i = 0; i < MATRIX_ROW_LENGTH; i++) {
      cols.push(board.filter((_, idx) => idx % MATRIX_ROW_LENGTH === i));
    }
    return cols;
  };

  const boardHasBingo = board => {
    const rows = getBoardRows(board);
    const cols = getBoardColumns(board);

    const hasBingo =
      rows.some(r => r.every(n => n === MARKER)) ||
      cols.some(r => r.every(n => n === MARKER));
    return hasBingo;
  };

  const getWinningBoardIfExists = (num, idx, boards) => {
    for (let i = 0; i < boards.length; i++) {
      boards[i] = boards[i].map(i => (i === num ? MARKER : i));
      if (idx >= MATRIX_ROW_LENGTH - 1 && boardHasBingo(boards[i])) {
        // It's impossible to get bingo for idx < MATRIX_ROW_LENGTH -1
        // So don't waste time validating
        boardHasBingo(boards[i], true);
        return boards[i];
        // what if both get bingo for the same num??
      }
    }
    return null;
  };

  const calculateScore = (board, num) => {
    const unmarkedSum = board.reduce((acc, curr) => {
      if (acc !== MARKER && curr !== MARKER) {
        return acc + curr;
      }
      return acc;
    }, 0);
    return unmarkedSum * num;
  };

  const drawnNumbers = getDrawnNumbersFromInput(input);
  const boards = getBingoBoardsFromInput(input);

  let winningBoard, winningNumber;

  for (let i = 0; i < drawnNumbers.length; i++) {
    winningNumber = drawnNumbers[i];
    winningBoard = getWinningBoardIfExists(winningNumber, i, boards);
    if (winningBoard) {
      break;
    }
  }

  return calculateScore(winningBoard, winningNumber);
};

const day04Part2 = input => {
  return undefined;
};

const run = () => {
  const data = txtFileLinesToArray('./day-04/data/challenge.txt');

  // Part 1
  const part1Result = day04(data);
  console.log('Part 1 answer:');
  console.log({ part1Result });

  // Part 2
  const part2Result = day04Part2(data);
  console.log('\n');
  console.log('Part 2 answer:');
  console.log({ part2Result });
};

run();

export { day04, day04Part2 };
