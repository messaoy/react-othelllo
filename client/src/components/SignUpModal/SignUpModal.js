import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


export class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      redirectToUser: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSignUp(user) {
    const { toggleModalSignUp } = this.props;
    axios.post('http://localhost:4001/api/users', user)
      .then(() => {
        this.setState({ redirectToUser: true });
      })
      .catch(() => {
        toggleModalSignUp(false);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, name } = this.state;
    const user = {
      email,
      name,
    };

    this.setState({ email: '', name: '' });
    return this.handleSignUp(user);
  }

  render() {
    const {
      email, name, redirectToUser,
    } = this.state;
    const { handleChange, handleSubmit } = this;
    const { toggleModalSignUp } = this.props;
    if (redirectToUser === true) {
      return <Redirect to="/" />;
    }
    return (
      <div id="modalSignUp">
        <div />
        <div>
          <header>
            <p>Inscription</p>
          </header>
          <div>
            <form>
              <div className="field">
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
              <div className="field">
                <p>
                  <input
                    id="nameInput"
                    required
                    className="input"
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={name}
                  />
                  <span />
                </p>
              </div>
              <footer>
                <button
                  id="submitButton"
                  type="submit"
                  onClick={handleSubmit}
                  className="button is-success"
                >
                  S&lsquo;inscrire
                </button>
                <button
                  id="cancelButton"
                  type="button"
                  onClick={() => toggleModalSignUp(false)}
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

export default SignUpModal;
