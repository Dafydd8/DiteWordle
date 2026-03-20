import { getRandomWord, words } from "./word.service.js";
const games = new Map();

export function startGame() {
  const gameId = crypto.randomUUID();

  const game = {
    secretWord: getRandomWord(),
    attempts: [],
    results: [],
    maxAttempts: 6,
    isOver: false,
    isWon: false,
  };

  games.set(gameId, game);

  return {
    gameId,
    state: {
      attempts: game.attempts,
      results: game.results,
      isOver: game.isOver,
      isWon: game.isWon,
      maxAttempts: game.maxAttempts,
    },
  };
}



export function getGameState(gameId) {
  const game = games.get(gameId);

  if (!game) {
    throw new Error("Game not found");
  }

  return {
    attempts: game.attempts,
    results: game.results,
    isOver: game.isOver,
    isWon: game.isWon,
    maxAttempts: game.maxAttempts,
  };
}

function evaluateGuess(intento, palabraSecreta) {
  const res = [];
  let apariciones = {};
  const posAChequear = [];

  let pos = 0;

  // contar apariciones de cada letra del intento en la palabra secreta
  for (const c of intento) {
    if (!(c in apariciones)) {
      apariciones[c] = [...palabraSecreta].filter(x => x === c).length;
    }
  }

  // primera pasada
  for (const c_letter of intento) {
    // 1: letra correcta en posición correcta
    // 0: letra incorrecta o letra correcta en posición incorrecta pero ya usada todas sus apariciones
    // -1: letra correcta en posición incorrecta
    if (apariciones[c_letter] === 0) {
      res.push(0);

    } else if (palabraSecreta[pos] === c_letter) {
      res.push(1);
      apariciones[c_letter]--;

    } else {
      res.push(0);
      posAChequear.push(pos);
    }

    pos++;
  }

  // segunda pasada
  for (const i of posAChequear) {
    if (apariciones[intento[i]] !== 0) {
      res[i] = -1;
      apariciones[intento[i]]--;
    }
  }

  return res;
}

export function submitGuess(gameId, guess) {
  const game = games.get(gameId);

  if (!game) {
    throw new Error("Game not found");
  }

  if (game.isOver) {
    throw new Error("Game is already over");
  }

  const normalizedGuess = guess.trim().toUpperCase();

  if (normalizedGuess.length !== 5) {
    throw new Error("Word must have 5 letters");
  }

  if (!words.includes(normalizedGuess)) {
    throw new Error("Word not in list");
  }

  const result = evaluateGuess(normalizedGuess, game.secretWord);

  game.attempts.push(normalizedGuess);
  game.results.push(result);

  if (normalizedGuess === game.secretWord) {
    game.isWon = true;
    game.isOver = true;
  } else if (game.attempts.length >= game.maxAttempts) {
    game.isOver = true;
  }

  return {
    result,
    attempts: game.attempts,
    results: game.results,
    isWon: game.isWon,
    isOver: game.isOver,
  };
}