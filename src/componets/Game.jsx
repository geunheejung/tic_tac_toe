import React from 'react';
import _cloneDeep from 'lodash/cloneDeep';
import Board from './Board';
import calculateWinner from '../domain/calculateWinner';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      xIsNext: true,
      step: 0,
    }
  }
  getNextTxt = () => this.state.xIsNext ? 'X' : 'O';

  getCurrent = () => {
    const { history, step } = this.state;
    return _cloneDeep(history[step]);
  }

  jumpTo = step => {
    this.setState({ step });
  }

  handleClick = (i) => {
    const { xIsNext, history, step } = this.state;
    const squares = this.getCurrent().squares;

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.getNextTxt();

    this.setState({
      history: [
        ...history,
        {
          squares
        }
      ],
      step: step  + 1,
      xIsNext: !xIsNext,
    });
  }

  render() {
    const { xIsNext, history } = this.state;
    const { squares } = this.getCurrent();
    const winner = calculateWinner(squares);
    const status = !!winner
      ? `Winner: ${winner}`
      : `Next player: ${this.getNextTxt()}`;

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : `Go to game start`;

      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    });

    return (
      <div className="game">
        <div className="status">${status}</div>
        <div className="game-board">
          <Board
            squares={squares}
            xIsNext={xIsNext}
            onClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;