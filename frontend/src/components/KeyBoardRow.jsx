import Tile from "./Tile";

function KeyBoardRow({ letters, letter_state}) {
  const tiles = [];

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i] || "";
    const status = letter_state[letter];

    tiles.push(
      <Tile
        key={i}
        letter={letter}
        status={status}
        height = {40}
        width = {35}
        fontSize = {"1.5rem"}
      />
    );
  }

  return (
    <div style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
      {tiles}
    </div>
  );
}

export default KeyBoardRow;