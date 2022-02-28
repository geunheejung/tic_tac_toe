import { v4 as uuidv4 } from 'uuid';
import Square from '../Sqaure';
import calculateWinner from '../../domain/calculateWinner';
import './styles.css';

const Board = ({
  squares,
  boardRow,
  onClick
 }) => {
  const renderSquare = () => {
    const { point: { a, b, c } } = calculateWinner(squares);

    // a, b, c에 해당하는 Sqaure에는 className에 bold 스타일을 추가한다.
    // a, b, c에 해당한다 -> squares를 map으로 돌린 뒤, row가 즉 현재 그린 요소가 a,b,c 중 같으면.

    const boardList = Array(boardRow).fill(0);
    const _squares = squares.map((_, i) => i);
    let start = 0;
    let end = boardRow;

    return boardList.map((row, x) => {
      const result = (
        <div className="board-row" key={uuidv4()}>
          {_squares.slice(start, end).map((col) => {
            const isMathced = col === a || col === b || col === c;
            const squareClass = {
              mathced: isMathced
            }
            return <Square
              key={uuidv4()}
              value={squares[col] || col}
              className={squareClass}
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