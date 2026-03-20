import express from "express";
import cors from "cors";
import gameRoutes from "./routes/game.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// todas las rutas de game arrancan con /api/game
app.use("/api/game", gameRoutes);

export default app;