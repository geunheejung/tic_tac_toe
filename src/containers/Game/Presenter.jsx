import React from 'react';
import Board from '../../componets/Board';
import calculateWinner from '../../domain/calculateWinner';
import './styles.css';

const Presenter = ({
  squares,
  xIsNext,
  history,
  changeStepTo,
  onSqaureClick,
}) => {

  const renderMoviews = () => {
    return history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : `Go to game start`;

      return (
        <li>
          <button onClick={() => changeStepTo(move)}>{desc}</button>
        </li>
      )
    });
  }

  const renderStatus = () => {
    const winner = calculateWinner(squares);
    const status = !!winner
      ? `Winner: ${winner}`
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

    return status;
  }

  return (
    <div className="game">
      <div className="status">${renderStatus()}</div>
      <div className="game-board">
        <Board
          squares={squares}
          xIsNext={xIsNext}
          onClick={onSqaureClick}
        />
      </div>
      <div className="game-info">
        <ol>{renderMoviews()}</ol>
      </div>
    </div>
  )
}

export default Presenter;