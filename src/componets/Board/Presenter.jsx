import { v4 as uuidv4 } from 'uuid';
import Square from '../Sqaure';
import './styles.css';

const Board = ({
  squares,
  boardRow,
  onClick
 }) => {
  const renderSquare = () => {
    const boardList = Array(boardRow).fill(0);
    const _squares = squares.map((_, i) => i);
    let start = 0;
    let end = boardRow;

    return boardList.map((row, x) => {
      const result = (
        <div className="board-row" key={uuidv4()}>
          {_squares.slice(start, end).map((col) => {
            return <Square
              key={uuidv4()}
              value={squares[col] || col}
              onSqaureClick={() => {
                onClick(col)}
              }
            />
          })}
        </div>
      );

      start += boardRow;
      end += boardRow;
      return result;
    })
  }

  return (
    <div>
      {renderSquare()}
    </div>
  );
}



export default Board;