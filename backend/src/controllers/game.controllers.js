import {
  startGame,
  submitGuess,
  getGameState
} from "../services/game.service.js";

// POST /api/game/start
export function startGameController(req, res) {
  try {
    const result = startGame();
    console.log("Partida iniciada:", result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /api/game/guess
export function submitGuessController(req, res) {
  try {
    const { gameId } = req.params;
    const { guess } = req.body;

    const result = submitGuess(gameId, guess);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// GET /api/game/state
export function getGameStateController(req, res) {
  try {
    const { gameId } = req.params;
    const state = getGameState(gameId);
    res.json(state);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
