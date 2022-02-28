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
  isSort,
  handleMoveClick,
  onSqaureClick,
  onSortClick,
}) => {

  const renderStatus = () => {
    const { winner } = calculateWinner(squares);
    let status;
    const player = xIsNext ? 'X' : 'O';

    status = winner === null
      ? `Next player: ${player}`
      : `Winner: ${winner}`;

    if (!winner && squares.every(i => !!i)) status = `Draw: ${player}`;

    return status;
  }

  return (
    <div className="game">
      <div className="status">{renderStatus()}</div>
      <div className="game-board">
        <Board
          squares={squares}
          xIsNext={xIsNext}
          boardRow={Math.floor(squares.length / 3)}
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
          <ol>
            <button onClick={onSortClick} disabled={isSort}>오름차순</button>
            <button onClick={onSortClick} disabled={!isSort}>내림차순</button>
          </ol>
        </ol>
      </div>
    </div>
  )
}

export default Presenter;