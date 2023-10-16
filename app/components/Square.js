export function Square({ value, onSquareClick, isWinnerSquare }) {
  return (
    <button  className={`square ${isWinnerSquare ? 'winner' : ''}`} onClick={onSquareClick} >
      {value}
    </button>
  );
}