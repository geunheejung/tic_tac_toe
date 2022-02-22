import React from 'react';
import Square from './Sqaure';


class Board extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
    }
  }

  handleClick(i) {
    const sqaures = [...this.state.squares];
    sqaures[i] = 'X';
    this.setState({ sqaures });
  }
  
  renderSquare(i) {
    const { squares } = this.state;
    return <Square
      value={squares[i]}
      onSqaureClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const status = 'Next player: X';

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