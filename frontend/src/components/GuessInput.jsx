import { useState } from "react";

function GuessInput({ onSubmitGuess }) {
  const [guess, setGuess] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!guess.trim()) return;

    onSubmitGuess(guess);
    setGuess("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
        maxLength={5}
        placeholder="Escribí tu palabra"
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default GuessInput;