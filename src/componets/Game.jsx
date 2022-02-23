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
          player: false,
        }
      ],
      xIsNext: true,
      step: 0,
    }
  }

  get step() { return this.state.step + 1; }

  get status() {
    const { squares } = this.currentHistory;
    const winner = calculateWinner(squares);

    return !!winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
  }

  get currentHistory() {
    const { history, step } = this.state;
    return history[step];
  }

  get movesView() {
    const { history } = this.state;
    return history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : `Go to game start`;

      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    });
  }

  jumpTo = step => {
    this.setState({
      step
    });
  }

  handleClick = (i) => {
    const { xIsNext, history, step } = this.state;
    const { squares } = this.currentHistory;

    if (calculateWinner(squares) || squares[i]) return;

    const cloneHistory = _cloneDeep(history);
    const cloneSquares = _cloneDeep(squares);

    const { player } = history[step];

    cloneSquares[i] = player ? 'O' : 'X';

    cloneHistory[this.step] = {
      squares: cloneSquares,
      player: !player,
    };

    this.setState({
      history: cloneHistory,
      step: this.step,
      xIsNext: !xIsNext,
    });
  }

  render() {
    const { xIsNext } = this.state;

    return (
      <div className="game">
        <div className="status">${this.status}</div>
        <div className="game-board">
          <Board
            squares={this.currentHistory.squares}
            xIsNext={xIsNext}
            onClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <ol>{this.movesView}</ol>
        </div>
      </div>
    );
  }
}

export default Game;