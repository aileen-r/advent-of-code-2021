import { txtFileLinesToArray } from '../shared.js';

// Bingo boards are all 5x5 matrices
const MATRIX_ROW_LENGTH = 5;
const MARKER = 'X';

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

const getWinningBoardsIfExists = (num, idx, boards) => {
  const winningBoards = [];
  for (let i = 0; i < boards.length; i++) {
    if (boards[i]) {
      boards[i] = boards[i].map(i => (i === num ? MARKER : i));
      if (idx >= MATRIX_ROW_LENGTH - 1 && boardHasBingo(boards[i])) {
        // It's impossible to get bingo for idx < MATRIX_ROW_LENGTH -1
        // So don't waste time validating
        winningBoards.push({ idx: i, board: boards[i] });
      }
    }
  }
  return winningBoards.length ? winningBoards : null;
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

const day04 = input => {
  const drawnNumbers = getDrawnNumbersFromInput(input);
  const boards = getBingoBoardsFromInput(input);

  let winningBoard, winningNumber;

  for (let i = 0; i < drawnNumbers.length; i++) {
    winningNumber = drawnNumbers[i];
    winningBoard = getWinningBoardsIfExists(winningNumber, i, boards);
    if (winningBoard) {
      winningBoard = winningBoard[0];
      break;
    }
  }

  return calculateScore(winningBoard.board, winningNumber);
};

const day04Part2 = input => {
  const drawnNumbers = getDrawnNumbersFromInput(input);
  const boards = getBingoBoardsFromInput(input);
  const numBoards = boards.length;

  let winningNumber, losingBoardIdx, newWinningBoards, losingBoard;
  const winningBoards = [];

  for (let i = 0; i < drawnNumbers.length; i++) {
    winningNumber = drawnNumbers[i];
    newWinningBoards = getWinningBoardsIfExists(winningNumber, i, boards);
    if (newWinningBoards) {
      // losing board has got bingo
      if (
        newWinningBoards.length === 1 &&
        newWinningBoards[0].idx === losingBoardIdx
      ) {
        losingBoard = newWinningBoards[0];
        break;
      }

      newWinningBoards.forEach(b => {
        winningBoards.push(b.idx);
        // remove board but maintain indices
        delete boards[b.idx];
      });

      if (
        losingBoardIdx === undefined &&
        winningBoards.length === numBoards - 1
      ) {
        // find loser
        for (let i = 0; i < numBoards; i++) {
          if (!winningBoards.includes(i)) {
            losingBoardIdx = i;
          }
        }
      }
    }
  }

  return calculateScore(losingBoard.board, winningNumber);
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
