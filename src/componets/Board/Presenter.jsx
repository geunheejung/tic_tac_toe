import { v4 as uuidv4 } from 'uuid';
import Square from '../Sqaure';
import './styles.css';

const Board = ({
   squares,
   onClick
 }) => {
  const renderSquare = (i) => {
    return <Square
      key={uuidv4()}
      value={squares[i] || i}
      onSqaureClick={() => onClick(i)}
    />;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default Board;