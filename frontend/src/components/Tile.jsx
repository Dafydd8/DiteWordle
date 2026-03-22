function Tile({ letter, status, height = 58, width = 58, fontSize = "2rem", onClick }) {
  let backgroundColor = "white";
  let borderColor = "#d3d6da";
  let textColor = "black";
  if (status === 1) {
    backgroundColor = "#6aaa64";
    borderColor = "#6aaa64";
    textColor = "white";
  }

  if (status === -1) {
    backgroundColor = "#c9b458";
    borderColor = "#c9b458";
    textColor = "white";
  }

  if (status === 0) {
    backgroundColor = "#787c7e";
    borderColor = "#787c7e";
    textColor = "white";
  }

  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: `2px solid ${borderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: `${fontSize}`,
        fontWeight: "bold",
        textTransform: "uppercase",
        backgroundColor: backgroundColor,
        color: textColor,
        boxSizing: "border-box",
      }}
    >
      {letter}
    </button>
  );
}

export default Tile;