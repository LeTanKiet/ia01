'use client'

import { useState } from "react";
import Board from "./Board";
import Toggle from "./Toggle";

const INITIAL_HISTORY = [Array(9).fill(null)];

export default function Game() {
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, row, col) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    if(nextMove === 0) {
      setHistory(INITIAL_HISTORY);
    }
    setCurrentMove(nextMove);
  }

  function calculateLocation(prevSquares, currentSquares) {
    for (let i = 0; i < currentSquares.length; i++) {
      if (prevSquares[i] !== currentSquares[i]) {
        const row = Math.floor(i / 3) + 1;
        const col = (i % 3) + 1;
        return `(${row}, ${col})`;
      }
    }
    return '';
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      const location = calculateLocation(history[move - 1], squares);
      description = `You are at move #${move} (${location})`;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <p onClick={() => jumpTo(move)}>{description}</p>
      </li>
    );
  });

  const sortedMoves = sortAscending ? moves : [...moves].reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      
      <div className="game-info">
        <Toggle onClick={() => setSortAscending(!sortAscending)} />
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}
