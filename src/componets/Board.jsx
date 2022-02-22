import React from 'react';
import Square from './Sqaure';
import calculateWinner from '../domain/calculateWinner';

class Board extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  getNextTxt = () => this.state.xIsNext ? 'X' : 'O';

  handleClick(i) {
    const { squares, xIsNext } = this.state;

    if (calculateWinner(squares) || squares[i]) return;

    const sqaures = [...squares];
    squares[i] = this.getNextTxt();
    this.setState({
      sqaures,
      xIsNext: !xIsNext,
    });
  }
  
  renderSquare(i) {
    const { squares } = this.state;
    return <Square
      value={squares[i] || i}
      onSqaureClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const { squares } = this.state;
    const winner = calculateWinner(squares);
    const status = !!winner
      ? `Winner: ${winner}`
      : `Next player: ${this.getNextTxt()}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;