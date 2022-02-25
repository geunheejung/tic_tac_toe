import React from 'react';
import _isNull from 'lodash/isNull';
import classNames from 'classnames';
import './styles.css';

const MoveList = props => {
  const {
    history,
    step,
    onMoveClick,
  } = props;

  return history.map(({ point: { x, y } }, move) => {
    const desc = move ? `Go to move #${move}` : `Go to game start`;

    return (
      <li
        key={move}
        className={classNames({
          move_li: true,
          selected: step === move,
        })}
      >
        <button onClick={() => onMoveClick(move)}>
          {desc} <span>{_isNull(x) || `x: ${x} , y: ${y}`}</span>
        </button>
      </li>
    )
  });
}

export default MoveList;