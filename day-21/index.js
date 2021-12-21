const BOARD_LENGTH = 10;
const DETERMINISTIC_DIE_SIZE = 100;
const WINNING_SCORE = 1000;

const day21 = input => {
  const playerScores = [0, 0];
  const playerPositions = [...input];
  let lastDiceRoll = 0;
  let dieRollCount = 0;
  let loser;

  const rollDice = () => {
    dieRollCount++;
    if (lastDiceRoll === DETERMINISTIC_DIE_SIZE) {
      lastDiceRoll = 1;
    } else {
      lastDiceRoll++;
    }
  };

  const takeTurn = position => {
    const diceRolls = [];
    for (let i = 0; i < 3; i++) {
      rollDice();
      diceRolls.push(lastDiceRoll);
    }
    const moves = diceRolls.reduce((acc, curr) => acc + curr);
    const newPos = (position + moves) % BOARD_LENGTH || BOARD_LENGTH;
    return newPos;
  };

  while (playerScores.every(s => s < WINNING_SCORE)) {
    for (let player = 0; player < playerPositions.length; player++) {
      const position = takeTurn(playerPositions[player]);
      playerPositions[player] = position;
      playerScores[player] += position;
      if (playerScores[player] >= WINNING_SCORE) {
        loser = player === 1 ? 0 : 1;
        break;
      }
    }
  }

  return dieRollCount * playerScores[loser];
};

const day21Part2 = input => {
  return undefined;
};

const run = () => {
  const data = [10, 6]; // player starting position

  // Part 1
  const part1Result = day21(data);
  console.log('Part 1 answer:');
  console.log({ part1Result });

  // Part 2
  const part2Result = day21Part2(data);
  console.log('\n');
  console.log('Part 2 answer:');
  console.log({ part2Result });
};

run();

export { day21, day21Part2 };
