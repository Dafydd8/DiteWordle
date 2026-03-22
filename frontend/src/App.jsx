import { useEffect, useState } from "react";
import Board from "./components/Board";
import KeyBoard from "./components/KeyBoard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function App() {
  const [gameId, setGameId] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [results, setResults] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  //const [attempt, setAttempt] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    async function initGame() {
      const savedGameId = localStorage.getItem("wordleGameId");

      if (savedGameId) {
        const res = await fetch(`${API_URL}/api/game/${savedGameId}/state`);

        if (res.ok) {
          const data = await res.json();
          setGameId(savedGameId);
          setAttempts(data.attempts);
          setResults(data.results);
          setIsGameOver(data.isOver);
          return;
        }
      }

      const res = await fetch(`${API_URL}/api/game/start`, { method: "POST" });
      const data = await res.json();

      localStorage.setItem("wordleGameId", data.gameId);
      setGameId(data.gameId);
    }

    initGame();
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (isGameOver) return;

      const key = e.key.toUpperCase();

      if (key === "ENTER") {
        submitGuess();
        return;
      }

      if (key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      const isLetter = /^[A-ZÑ]$/.test(key);

      if (isLetter && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuess, isGameOver]);

  async function submitGuess() {
    try {
      const res = await fetch(`${API_URL}/api/game/${gameId}/guess`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guess: currentGuess }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Error", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return;
      }
      
      // setAttempt(currentGuess);
      setAttempts((prev) => [...prev, currentGuess]);
      setResults((prev) => [...prev, data.result]);
      setCurrentGuess("");

      console.log("Respuesta del backend:", data);
      if (data.isWon) {
        setIsGameOver(true);
        toast.success("¡Felicidades! Has adivinado la palabra.", {
          autoClose: 10000,
          hideProgressBar: true,
        });
        localStorage.removeItem("wordleGameId");
      } else if (data.isOver) {
        toast.success(`Juego terminado. La palabra era: ${data.word}`, {
          autoClose: 10000,
          hideProgressBar: true,
        });
        setIsGameOver(true);
        localStorage.removeItem("wordleGameId");
      }
    } catch (error) {
      toast.error("Error conectando con el backend", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  }

  return (
    <div className="content">
      <h1>DiteWordle</h1>

      <Board
        attempts={attempts}
        results={results}
        currentGuess={currentGuess}
      />

      <KeyBoard
        attempts={attempts}
        results={results}
      />
      
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        closeButton={false}
        icon={false}
      />
    </div>
  );
}

export default App;