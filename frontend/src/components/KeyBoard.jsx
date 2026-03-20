import KeyBoardRow from "./KeyBoardRow";

const rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const letter_state = {};

for (const letter of alphabet) {
  letter_state[letter] = 'NotTried';
}

function KeyBoard({ attempt, results }) {
  results = results[results.length - 1] || [];

  for (let i = 0; i < attempt.length; i++) {
    const letter = attempt[i];
    letter_state[letter] = results[i];
  }

  return (
    <div style = {{display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", marginTop: "20px"}}>
      {rows.map((row, index) => (
        <KeyBoardRow
          key={index}
          letters={row.split("")}
          letter_state={letter_state}
        />
      ))}
    </div>
  );
}

export default KeyBoard;