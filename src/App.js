import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chess from 'chess.js';
class App extends Component {

  constructor(props) {
    super(props);
    this.board = null;
    this.state = {
      fens: ["rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1", "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2", "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2", "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3", "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3", "rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4", "rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/2N2P2/PP2P1PP/R1BQKBNR b KQkq - 0 4", "rn1qkb1r/pp2pppp/2p2n2/3p1b2/2PP4/2N2P2/PP2P1PP/R1BQKBNR w KQkq - 1 5", "rn1qkb1r/pp2pppp/2p2n2/3p1bB1/2PP4/2N2P2/PP2P1PP/R2QKBNR b KQkq - 2 5", "rn2kb1r/pp2pppp/2p2n2/q2p1bB1/2PP4/2N2P2/PP2P1PP/R2QKBNR w KQkq - 3 6", "rn2kb1r/pp2pppp/2p2B2/q2p1b2/2PP4/2N2P2/PP2P1PP/R2QKBNR b KQkq - 0 6", "rn2kb1r/pp3ppp/2p2p2/q2p1b2/2PP4/2N2P2/PP2P1PP/R2QKBNR w KQkq - 0 7", "rn2kb1r/pp3ppp/2p2p2/q2p1b2/2PP4/2N2P2/PP1QP1PP/R3KBNR b KQkq - 1 7", "rn2k2r/pp3ppp/2p2p2/q2p1b2/1bPP4/2N2P2/PP1QP1PP/R3KBNR w KQkq - 2 8", "rn2k2r/pp3ppp/2p2p2/q2p1b2/1bPP4/2N1PP2/PP1Q2PP/R3KBNR b KQkq - 0 8", "rn3rk1/pp3ppp/2p2p2/q2p1b2/1bPP4/2N1PP2/PP1Q2PP/R3KBNR w KQ - 1 9", "rn3rk1/pp3ppp/2p2p2/q2p1b2/1bPP4/2NBPP2/PP1Q2PP/R3K1NR b KQ - 2 9", "rn3rk1/pp3ppp/2p2p2/q2p4/1bPP4/2NbPP2/PP1Q2PP/R3K1NR w KQ - 0 10", "rn3rk1/pp3ppp/2p2p2/q2p4/1bPP4/2NQPP2/PP4PP/R3K1NR b KQ - 0 10", "rn2r1k1/pp3ppp/2p2p2/q2p4/1bPP4/2NQPP2/PP4PP/R3K1NR w KQ - 1 11", "rn2r1k1/pp3ppp/2p2p2/q2p4/1bPP4/2NQPP2/PP3KPP/R5NR b - - 2 11", "rn2r1k1/pp3ppp/2p2p2/q7/1bpP4/2NQPP2/PP3KPP/R5NR w - - 0 12", "rn2r1k1/pp3ppp/2p2p2/q7/1bQP4/2N1PP2/PP3KPP/R5NR b - - 0 12", "rn2r1k1/pp3ppp/2pb1p2/q7/2QP4/2N1PP2/PP3KPP/R5NR w - - 1 13", "rn2r1k1/pp3ppp/2pb1p2/q7/2QP4/2N1PP2/PP2NKPP/R6R b - - 2 13", "rn2r1k1/ppq2ppp/2pb1p2/8/2QP4/2N1PP2/PP2NKPP/R6R w - - 3 14", "rn2r1k1/ppq2ppp/2pb1p2/8/2QPN3/4PP2/PP2NKPP/R6R b - - 4 14", "rn2r1k1/ppq1bppp/2p2p2/8/2QPN3/4PP2/PP2NKPP/R6R w - - 5 15", "rn2r1k1/ppq1bppp/2p2p2/8/2QPN2P/4PP2/PP2NKP1/R6R b - h3 0 15", "rn2r1k1/ppq1bppp/2p5/5p2/2QPN2P/4PP2/PP2NKP1/R6R w - - 0 16", "rn2r1k1/ppq1bppp/2p5/5p2/2QP3P/4PPN1/PP2NKP1/R6R b - - 1 16", "rn2r1k1/ppq1bp1p/2p3p1/5p2/2QP3P/4PPN1/PP2NKP1/R6R w - - 0 17", "rn2r1k1/ppq1bp1p/2p3p1/5p1P/2QP4/4PPN1/PP2NKP1/R6R b - - 0 17", "rn2r3/ppq1bpkp/2p3p1/5p1P/2QP4/4PPN1/PP2NKP1/R6R w - - 1 18", "rn2r3/ppq1bpkp/2p3P1/5p2/2QP4/4PPN1/PP2NKP1/R6R b - - 0 18", "rn2r3/ppq1bpk1/2p3p1/5p2/2QP4/4PPN1/PP2NKP1/R6R w - - 0 19", "rn2r3/ppq1bpkR/2p3p1/5p2/2QP4/4PPN1/PP2NKP1/R7 b - - 1 19", "rn2r3/ppq1bp1k/2p3p1/5p2/2QP4/4PPN1/PP2NKP1/R7 w - - 0 20", "rn2r3/ppq1bQ1k/2p3p1/5p2/3P4/4PPN1/PP2NKP1/R7 b - - 0 20", "rn2r2k/ppq1bQ2/2p3p1/5p2/3P4/4PPN1/PP2NKP1/R7 w - - 1 21", "rn2r2k/ppq1bQ2/2p3p1/5p2/3P4/4PPN1/PP2NKP1/7R b - - 2 21"]
    };
  }

  componentDidMount() { }

  onSelectFen = (evt, fen) => {
    evt.preventDefault();
    const game = new Chess(fen);
    this.board.setPosition(game.fen());
  };

  render() {
    const size = 500;
    const code = 'dzm,rfgrkgn rkhrkhnrhrh';
    const chessboardProps = {
      'position': this.state.fens[0],
      'orientation': 'white',
      'draggable-pieces': '',
      'hide-notation': null,
      'drop-off-board': 'snapback',
      'class': 'id-' + code
    };

    return (
      <div className="app">
        <div className="left">
          {this.state.fens.map((x, idx) => (<div key={idx}>
            <a href="#" onClick={e => this.onSelectFen(e, x)}>{(idx + 1)} - {x}</a>
          </div>))}
        </div>
        <div className="right">
          <chess-board
            ref={(el) => (this.board = el)}
            {...chessboardProps}
            style={{ width: size }}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {};

export default App;





