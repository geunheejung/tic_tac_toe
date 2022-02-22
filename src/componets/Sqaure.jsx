import React from 'react';

export default ({
  value,
  onSqaureClick,
}) => {
  return (
    <button
      className="square"
      onClick={onSqaureClick}
    >
      {value}
    </button>
  );
}