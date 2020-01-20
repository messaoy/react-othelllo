import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


export class SignInModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectToUser: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSignIn(user) {
    const { connect, toggleModal } = this.props;
    axios.post('http://localhost:4001/api/users/signin', user)
      .then((res) => {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('userId', `${res.data.userId}`);
        sessionStorage.setItem('name', `${res.data.name}`);
        this.setState({ redirectToUser: true });
        setTimeout(() => connect(), 100);
      })
      .catch(() => {
        toggleModal(false);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };

    this.setState({ email: '', password: '' });
    return this.handleSignIn(user);
  }

  render() {
    const {
      email, password, redirectToUser,
    } = this.state;
    const { handleChange, handleSubmit } = this;
    const { toggleModal } = this.props;
    if (redirectToUser === true) {
      return <Redirect to="/board" />;
    }
    return (
      <div id="modalLogin" className="modal is-active">
        <div />
        <div>
          <header>
            <p>Connexion</p>
          </header>
          <div>
            <form>
              <div>
                <p>
                  <input
                    id="emailInput"
                    required
                    className="input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={email}
                  />
                  <span />
                </p>
              </div>
              <div>
                <p>
                  <input
                    id="passwordInput"
                    required
                    className="input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={password}
                  />
                </p>
              </div>
              <footer>
                <button
                  id="submitButton"
                  type="submit"
                  onClick={handleSubmit}
                  className="button is-success"
                >
                  Se connecter
                </button>
                <button
                  id="cancelButton"
                  type="button"
                  onClick={() => toggleModal(false)}
                  className="button"
                >
                  Annuler
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInModal;
