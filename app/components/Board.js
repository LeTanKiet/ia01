'use client'
import { useRef } from "react";
import { Square } from "./Square";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}


export default function Board({ xIsNext, squares, onPlay }) {
  const statusRef = useRef(null);


  function handleClick(i) {
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    const row = Math.floor(i / 3) + 1; 
    const col = (i % 3) + 1; 
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, row, col);
  }

  const { winner, line } = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
    statusRef.current.style.color = 'green'
  } else if (squares.every((square) => square)) {
    status = 'It\'s a draw!';
    statusRef.current.style.color = 'red'
  } else {
    if (statusRef.current) statusRef.current.style.color = 'black'
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const numRows = 3;
  const numCols = 3;

  const board = [];

  for (let i = 0; i < numRows; i++) {
    const row = [];

    for (let j = 0; j < numCols; j++) {
      const squareIndex = i * numCols + j;
      const isWinnerSquare = line.includes(squareIndex);
      row.push(
        <Square
          key={squareIndex}
          value={squares[squareIndex]}
          onSquareClick={() => handleClick(squareIndex)}
          isWinnerSquare={isWinnerSquare}
        />
      );
    }

    board.push(
      <div key={i} className="board-row">
        {row}
      </div>
    );
  }
  
  return (
    <>
      <div ref={statusRef} className="status">{status}</div>

      {board}
    </>
  );
}