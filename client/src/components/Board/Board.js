import React from 'react';
import Reversi from 'reversi';
import socketIOClient from 'socket.io-client';
import merge from 'lodash.merge';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cell from '../Cell/Cell';
import Disk from '../Disk/Disk';

const { Game } = Reversi;

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGames: [],
      game: new Game(),
      gameStarted: false,
      gameEnded: false,
      socket: socketIOClient('localhost:4001'),
      roomUrl: '',
      passCountBlack: 0,
      passCountWhite: 0,
      gameId: null,
      redirectToGame: false,
      playerBlackName: '',
      playerWhiteName: '',
      winner: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.handleRoomUrl = this.handleRoomUrl.bind(this);
  }

  componentDidMount() {
    const {
      game, socket,
    } = this.state;
    const { match } = this.props;
    const { gameId } = match.params;
    if (gameId) {
      axios.get(`http://localhost:4001/api/games/${parseInt(gameId, 10)}`)
        .then((res) => {
          const updatedBoard = merge(game, JSON.parse(res.data.game[0].board));
          if (res.data.users[1]) {
            this.setState({
              game: updatedBoard,
              gameStarted: true,
              passCountBlack: res.data.game[0].passBlack,
              passCountWhite: res.data.game[0].passWhite,
              roomUrl: res.data.game[0].partyCode,
              playerBlackName: res.data.users[0][0].name,
              playerWhiteName: res.data.users[1][0].name,
            });
          } else {
            this.setState({
              game: updatedBoard,
              gameStarted: true,
              passCountBlack: res.data.game[0].passBlack,
              passCountWhite: res.data.game[0].passWhite,
              roomUrl: res.data.game[0].partyCode,
              playerBlackName: res.data.users[0].name,
            });
          }
          this.joinRoom();
        })
        .catch(() => {
        });
    } else {
      axios.get('http://localhost:4001/api/games')
        .then((res) => {
          const cleanGames = res.data;
          cleanGames.forEach((party) => {
            // eslint-disable-next-line no-param-reassign
            party.board = merge(new Game(), JSON.parse(party.board));
            return true;
          });
          this.setState({ activeGames: cleanGames });
        })
        .catch(() => {
        });
    }
    socket.on('update board', (newData, player, pass, color) => {
      toast.dismiss();
      if (pass === 1) {
        toast.error(`Le joueur ${player} a passé son coup !`);
        if (color === 'black') {
          this.setState({ passCountBlack: 1 });
        } else {
          this.setState({ passCountWhite: 1 });
        }
      } else {
        toast.warn(`Le joueur ${player} a joué son coup !`);
      }
      const updatedBoard = merge(game, newData);
      this.setState({ game: updatedBoard });
      const { roomUrl, playerBlackName, playerWhiteName } = this.state;
      if (updatedBoard.isEnded) {
        if (updatedBoard.getHighScorer() === 'BLACK') {
          socket.emit('game-end', roomUrl, playerBlackName);
        } else if (updatedBoard.getHighScorer() === 'WHITE') {
          socket.emit('game-end', roomUrl, playerWhiteName);
        } else if (updatedBoard.getHighScorer() === null) {
          socket.emit('game-end', roomUrl, 'draw');
        }
      }
    });
    socket.on('join-room', (nameBlack, nameWhite, playerJoin, boardId) => {
      if (!gameId) {
        this.setState({
          redirectToGame: true,
          gameId: boardId,
        });
      } else {
        toast.dismiss();
        if (nameWhite) this.setState({ playerWhiteName: nameWhite });
        toast.info(`Le joueur ${playerJoin} a rejoint la partie`);
      }
    });
    socket.on('create-game', (boardId) => {
      if (!gameId) {
        this.setState({
          redirectToGame: true,
          gameId: boardId,
        });
      }
    });
    socket.on('game-end', (winner) => {
      setTimeout(() => {
        toast.dismiss();
        toast.success(winner);
      }, 1000);
      this.setState({ gameEnded: true, winner });
    });
  }

  componentWillUnmount() {
    const { socket } = this.state;
    socket.removeListener('update board');
    socket.removeListener('join-room');
  }

  handleClick(x, y) {
    const {
      game, gameStarted, roomUrl, socket, passCountBlack, passCountWhite, playerBlackName,
      playerWhiteName, gameEnded,
    } = this.state;
    if (!gameStarted || gameEnded) return false;
    if (playerBlackName === sessionStorage.getItem('name') && game._nextPieceType === 'WHITE') {
      return false;
    }
    if (playerWhiteName === sessionStorage.getItem('name') && game._nextPieceType === 'BLACK') {
      return false;
    }
    if ((x === -1 && y === -1)) {
      if (passCountBlack === 1 || passCountWhite === 1) {
        if (game.getHighScorer() === 'BLACK') {
          socket.emit('game-end', roomUrl, playerBlackName);
        } else if (game.getHighScorer() === 'WHITE') {
          socket.emit('game-end', roomUrl, playerWhiteName);
        } else if (game.getHighScorer() === null) {
          socket.emit('game-end', roomUrl, 'draw');
        }
      }
      const updatedGame = game;
      if (game._nextPieceType === 'BLACK') {
        updatedGame._nextPieceType = 'WHITE';
        socket.emit('update board', game, roomUrl, sessionStorage.getItem('name'), 1, 'black');
      } else {
        updatedGame._nextPieceType = 'BLACK';
        socket.emit('update board', game, roomUrl, sessionStorage.getItem('name'), 1, 'white');
      }
      this.setState({ game: updatedGame });
    } else {
      const result = game.proceed(x, y);
      if (!result.isSuccess) return false;
      socket.emit('update board', game, roomUrl, sessionStorage.getItem('name'));
    }
    this.forceUpdate();
    return true;
  }

  createRoom() {
    const { socket, game } = this.state;
    const code = `reverzi-${Math.random().toString(36).substring(4)}`;
    this.setState({ roomUrl: code });
    socket.emit('create-game', game, code, sessionStorage.getItem('userId'));
  }

  joinRoom() {
    const { roomUrl, socket } = this.state;
    socket.emit('join-room', roomUrl, sessionStorage.getItem('userId'), sessionStorage.getItem('name'));
  }

  handleRoomUrl(e) {
    this.setState({ roomUrl: e.target.value });
  }

  render() {
    const {
      game, roomUrl, playerBlackName, playerWhiteName, gameStarted, gameId,
      redirectToGame, winner, gameEnded, activeGames,
    } = this.state;
    const score = game.board.countByPieceType();
    const colorToPlay = game._nextPieceType;
    if (!sessionStorage.getItem('userId')) {
      return <Redirect to="/" />;
    }
    if (redirectToGame) {
      return <Redirect to={`/board/${gameId}`} />;
    }
    if (!gameStarted) {
      return (
        <>
          <h2>
            Joueur&nbsp;
            { sessionStorage.getItem('name') }
          </h2>
          <div className="margin">
            <button type="button" onClick={() => this.createRoom()}>Créer une nouvelle partie</button>
          </div>
          <div className="margin">
            <input type="text" onChange={this.handleRoomUrl} />
            <input
              type="button"
              value="Rejoindre une partie via un code"
              onClick={() => this.joinRoom()}
            />
          </div>
          <div className="margin">
            <ul>
              { activeGames.map((party) => (
                <li key={party.partyCode} className="border">
                  <a href={`board/${party.id}`}>
                    <div className="margin">
                    Game n°
                      {party.id + 1}
                    </div>
                    {party.board._nextPieceType === 'WHITE' && party.playerWhite === parseInt(sessionStorage.getItem('userId'), 10)
                    && (
                      <div className="margin">
                        A votre tour de jouer (blanc)
                        <ul />
                      </div>
                    )}
                    {party.board._nextPieceType === 'BLACK' && party.playerBlack === parseInt(sessionStorage.getItem('userId'), 10)
                    && (
                      <div className="margin">
                        A votre tour de jouer (noir)
                        <ul />
                      </div>
                    )}
                    {party.board._nextPieceType === 'BLACK' && party.playerBlack !== parseInt(sessionStorage.getItem('userId'), 10)
                    && (
                      <div className="margin">
                        Au tour de votre adversaire de jouer (Noir)
                        <ul />
                      </div>
                    )}
                    {party.board._nextPieceType === 'WHITE' && party.playerWhite !== parseInt(sessionStorage.getItem('userId'), 10)
                    && (
                      <div className="margin">
                        Au tour de votre adversaire de jouer (Blanc)
                        <ul />
                      </div>
                    )}
                    {!party.playerWhite
                    && (
                      <div className="margin">
                        En attente d&lsquo;un joueur blanc !
                        <ul />
                      </div>
                    )}
                  </a>
                </li>
              )) }
            </ul>
            <div className="margin">
              <a href="/">Revenir à l&lsquo;accueil</a>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="column" />
        <h1>Othello</h1>
        <h2>
Joueur&nbsp;
          { sessionStorage.getItem('name') }
        </h2>
        <ToastContainer autoClose={false} />
        <div className="column" />
        {
          game.board.squares.map((column) => (
            <div className="column" key={Math.random().toString(36).substring(7)}>
              {
                column.map((cell) => {
                  if (cell.pieceType !== 'BLANK') {
                    return (
                      <Cell
                        key={Math.random().toString(36).substring(7)}
                        diskColor={cell.pieceType}
                        x={cell.rowIndex}
                        y={cell.colIndex}
                        handleClick={this.handleClick}
                      />
                    );
                  }
                  return (
                    <Cell
                      key={Math.random().toString(36).substring(7)}
                      diskColor="blank"
                      x={cell.rowIndex}
                      y={cell.colIndex}
                      handleClick={this.handleClick}
                    />
                  );
                })
              }
            </div>
          ))
        }
        <div>
          <div className="margin">
          Joueur Noir :&nbsp;
            { playerBlackName }
            {colorToPlay === 'BLACK'
            && (
              <span>
             &nbsp;- A toi de jouer !
              </span>
            )}
            {colorToPlay === 'WHITE'
            && (
              <span>
             &nbsp;- En attente
              </span>
            )}
          </div>
          <div className="margin">
            Joueur Blanc :&nbsp;
            { playerWhiteName }
            {colorToPlay === 'WHITE'
              && (
              <span>
             &nbsp;- A toi de jouer !
              </span>
              )}
            {colorToPlay === 'BLACK'
            && (
              <span>
             &nbsp;- En attente
              </span>
            )}
          </div>
          <div>
          Au tour des :&nbsp;
            {colorToPlay}
          </div>
          <Disk diskColor={colorToPlay} />
        </div>
        <div>
          <div>
            Pièces noires :&nbsp;
            {score.BLACK}
          </div>
          <div>
            Pièces blanches :&nbsp;
            {score.WHITE}
          </div>
          <div className="margin">
            <button type="button" onClick={() => this.handleClick(-1, -1)}>Passer mon tour</button>
          </div>
          <div>
            Code Party :&nbsp;
            { roomUrl }
          </div>
          {gameEnded
          && (
            <div className="margin">
              {winner}
            </div>
          )}
        </div>
        <div className="margin">
          <a href="/board">Revenir à la liste</a>
        </div>
        <div className="margin">
          <a href="/">Revenir à l&lsquo;accueil</a>
        </div>
      </>
    );
  }
}

export default Board;
