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
      sequence: 0,
    }
  }
  getNextTxt = () => this.state.xIsNext ? 'X' : 'O';

  getCurrent = () => {
    const { history, sequence } = this.state;
    return _cloneDeep(history[sequence]);
  }

  handleClick = (i) => {
    const { xIsNext, history, sequence } = this.state;
    const squares = this.getCurrent().squares;

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.getNextTxt();

    /*
    * 시간 여행
    *
    * 1. prev, next 버튼을 만든다
    * 2. 현재 시점 인덱스를 관리한다.
    * 3. (2)의 인덱스에 해당하는 데이터를 그린다.

    * */

    this.setState({
      history: [
        ...history,
        {
          squares
        }
      ],
      xIsNext: !xIsNext,
      sequence: sequence + 1,
    });
  }

  changeSequence = (isIncrease) => {
    const { sequence } = this.state;
    if (sequence < 0) return;

    this.setState({ sequence: isIncrease ? sequence + 1 : sequence - 1 });
  }

  handleSequence = (isNext) => {
    this.changeSequence(isNext);
  }

  render() {
    const { xIsNext } = this.state;
    const { squares } = this.getCurrent();
    const winner = calculateWinner(squares);
    const status = !!winner
      ? `Winner: ${winner}`
      : `Next player: ${this.getNextTxt()}`;

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
          <div>
            <button onClick={() => this.handleSequence(true)}>next</button>
            <button onClick={() => this.handleSequence(false)}>prev</button>
          </div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;