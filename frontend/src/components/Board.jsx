import BoardRow from "./BoardRow";

function Board({ attempts, results, currentGuess }) {
  const totalRows = 6;
  const rowsUsed = attempts.length + 1;
  const emptyRows = totalRows - rowsUsed;

  return (
    <div>
      {attempts.map((attempt, index) => (
        <BoardRow
          key={index}
          letters={attempt.split("")}
          results={results[index]}
        />
      ))}

      {attempts.length < totalRows && (
        <BoardRow
          letters={currentGuess.split("")}
          results={[]}
          isActive={true}
        />
      )}

      {Array.from({ length: emptyRows }).map((_, index) => (
        <BoardRow
          key={`empty-${index}`}
          letters={[]}
          results={[]}
        />
      ))}
    </div>
  );
}

export default Board;