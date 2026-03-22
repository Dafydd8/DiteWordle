import KeyBoardRow from "./KeyBoardRow";

const rows = ['QWERTYUIOP', 'ASDFGHJKL', '↩ZXCVBNM⌫'];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const letter_state = {};
const dict_empty = true;
for (const letter of alphabet) {
  letter_state[letter] = 'NotTried';
}

function KeyBoard({ attempts, results, onKeyPress }) {
  if (results.length > 0 && dict_empty) {
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const attempt = attempts[i]
      for (let j = 0; j < 5; j++) {
        letter_state[attempt[j]] = result[j];
      }
    }
  }

  const last_result = results[results.length - 1] || [];
  const last_attempt = attempts[attempts.length - 1] || [];

  for (let i = 0; i < last_attempt.length; i++) {
    const letter = last_attempt[i];
    letter_state[letter] = last_result[i];
  }

  return (
    <div style = {{display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", marginTop: "20px"}}>
      {rows.map((row, index) => (
        <KeyBoardRow
          key={index}
          letters={row.split("")}
          letter_state={letter_state}
          onKeyPress={onKeyPress}
        />
      ))}
    </div>
  );
}

export default KeyBoard;