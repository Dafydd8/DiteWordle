import express from "express";
import {
  startGameController,
  submitGuessController,
  getGameStateController
} from "../controllers/game.controllers.js";

const router = express.Router();

router.post("/start", startGameController);
router.get("/:gameId/state", getGameStateController);
router.post("/:gameId/guess", submitGuessController);

export default router;