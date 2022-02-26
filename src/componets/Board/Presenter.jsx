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
    let squareIndex = 0;

    return boardList.map((row, x) => (
      <div className="board-row" key={uuidv4()}>
        {boardList.map((col) => {
          squareIndex += 1;
          return <Square
            key={uuidv4()}
            value={squares[squareIndex] || squareIndex}
            onSqaureClick={() => onClick(squareIndex)}
          />
        })}
      </div>
    ))
  }

  return (
    <div>
      {renderSquare()}
    </div>
  );
}



export default Board;