import React from 'react';
import _cloneDeep from 'lodash/cloneDeep';
import Presenter from './Presenter';
import calculateWinner from '../../domain/calculateWinner';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          player: false,
          point: {
            x: null,
            y: null
          }
        }
      ],
      xIsNext: true,
      step: 0,
      isSort: false,
    }

    this.GAME_MAP = 3;
  }

  get step() { return this.state.step + 1; }

  get currentHistory() {
    const { history, step } = this.state;
    return history[step];
  }

  handleMoveClick = step => this.setState({ step });

  changeHistoryTo = hIndex => {
    const { history, step } = this.state;
    const { squares } = this.currentHistory;

    const cloneHistory = _cloneDeep(history);
    const cloneSquares = _cloneDeep(squares);

    const { player } = history[step];

    cloneSquares[hIndex] = player ? 'O' : 'X';

    cloneHistory[this.step] = {
      squares: cloneSquares,
      player: !player,
      point: {
        x: Math.floor(hIndex / this.GAME_MAP),
        y: hIndex % this.GAME_MAP
      },
    };

    this.setState({
      history: cloneHistory
    });
  }

  handleSqaureClick = i => {
    const { xIsNext } = this.state;
    const { squares } = this.currentHistory;

    if (calculateWinner(squares).winner || squares[i]) return;

    this.changeHistoryTo(i);
    this.setState({
      step: this.step,
      xIsNext: !xIsNext,
    });
  }

  handleSortClick = () => {
    const { isSort, history } = this.state;

    this.setState({ history: history.reverse(), isSort: !isSort });
  }

  render() {
    const { xIsNext, history, step, isSort } = this.state;

    return (
      <Presenter
        squares={this.currentHistory.squares}
        history={history}
        xIsNext={xIsNext}
        step={step}
        isSort={isSort}
        handleMoveClick={this.handleMoveClick}
        onSqaureClick={this.handleSqaureClick}
        onSortClick={this.handleSortClick}
      />
    )
  }
}

export default Game;