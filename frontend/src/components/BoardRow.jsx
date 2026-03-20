import Tile from "./Tile";

function BoardRow({ letters, results, isActive = false }) {
  const tiles = [];
  for (let i = 0; i < 5; i++) {
    const letter = letters[i] || "";
    const status = results[i] ?? "empty";
    tiles.push(
      <Tile
        key={i}
        letter={letter}
        status={status}
      />
    );
  }

  return (
    <div style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
      {tiles}
    </div>
  );
}

export default BoardRow;