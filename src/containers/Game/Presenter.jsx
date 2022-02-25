import React from 'react';
import _isNull from 'lodash/isNull';
import Board from '../../componets/Board';
import MoveList from '../../componets/MoveList';
import calculateWinner from '../../domain/calculateWinner';
import './styles.css';

const Presenter = ({
  squares,
  xIsNext,
  history,
  step,
  handleMoveClick,
  onSqaureClick,
}) => {

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
        <ol>
          <MoveList
            history={history}
            step={step}
            onMoveClick={handleMoveClick}
          />
        </ol>
      </div>
    </div>
  )
}

export default Presenter;