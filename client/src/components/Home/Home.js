import React from 'react';
import { Link } from 'react-router-dom';
import { SignInModal } from '../SignInModal/SignInModal';
import { SignUpModal } from '../SignUpModal/SignUpModal';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: false,
      loggedIn: false,
      modalStateSignUp: false,
      name: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalSignUp = this.toggleModalSignUp.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  componentDidMount() {
    let isUserLogged = sessionStorage.getItem('loggedIn');
    isUserLogged = JSON.parse(isUserLogged);
    if (isUserLogged != null && isUserLogged) {
      this.setState({ loggedIn: true });
      this.connect();
    } else {
      this.setState({ loggedIn: false, modalState: '', modalStateSignUp: '' });
    }
  }

  toggleModal = (ev) => {
    if (!ev) {
      this.setState({ modalState: false });
    } else {
      this.setState({ modalState: true });
    }
  };

  toggleModalSignUp = (ev) => {
    if (!ev) {
      this.setState({ modalStateSignUp: false });
    } else {
      this.setState({ modalStateSignUp: true });
    }
  };

  /**
   * Allows to disconnect a user
   */
  disconnect() {
    this.setState({
      modalState: false,
      modalStateSignUp: false,
      loggedIn: false,
      name: '',
    });
    return sessionStorage.clear();
  }

  /**
   * Allows to connect a user
   */
  connect() {
    const name = sessionStorage.getItem('name');
    this.setState({ loggedIn: true, name });
  }

  render() {
    const {
      loggedIn, modalState, modalStateSignUp, email, password, name,
    } = this.state;

    return (
      <>
        <div>
          <h1>Bienvenue sur le jeu Othello !</h1>
          {!loggedIn
        && (
          <div>
            <button type="submit" onClick={() => this.toggleModal(true)} className="button">
            Se connecter
            </button>
            <button type="submit" onClick={() => this.toggleModalSignUp(true)} className="button">
            S&lsquo;inscrire
            </button>
          </div>
        )}
          {loggedIn
        && (
          <div>
            <h2>
              Joueur&nbsp;
              { sessionStorage.getItem('name') }
            </h2>
            <Link
              onClick={() => this.disconnect()}
              to="/"
            >
              <span> Se déconnecter</span>
            </Link>
            <div>
              <a href="/board">Liste des parties</a>
            </div>
          </div>
        )}
        </div>
        {modalState && !loggedIn
        && (
          <SignInModal
            toggleModal={this.toggleModal}
            email={email}
            password={password}
            connect={this.connect}
          />
        )}
        {modalStateSignUp && !loggedIn
        && (
          <SignUpModal
            toggleModalSignUp={this.toggleModalSignUp}
            email={email}
            name={name}
          />
        )}
      </>
    );
  }
}

export default Home;
