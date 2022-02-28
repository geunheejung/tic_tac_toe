import React from 'react';
import classNames from 'classnames';

export default ({

  value,
  className,
  onSqaureClick,
}) => {
  return (
    <button
      className={classNames({
        square: true,
        ...className
      })}
      onClick={onSqaureClick}
    >
      {value}
    </button>
  );
}