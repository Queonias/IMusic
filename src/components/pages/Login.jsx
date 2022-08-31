import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    nameUser: '',
    loginName: true,
    enviar: false,
    msg: false,
  };

  nameValidator = ({ target }) => {
    const numMinCaracter = 3;
    const { value } = target;
    if (value.length >= numMinCaracter) {
      this.setState({ loginName: false, nameUser: value });
    } else this.setState({ loginName: true });
  };

  handleClick = () => {
    const { nameUser } = this.state;

    this.setState({ msg: true }, async () => {
      await createUser({ name: nameUser });
      this.setState({ msg: true, enviar: true });
    });
  };

  render() {
    const { loginName, enviar, msg } = this.state;
    if (!msg) {
      return (
        <div data-testid="page-login">
          <form>
            <label htmlFor="login-name-input">
              <input
                type="name"
                id="login-name-input"
                data-testid="login-name-input"
                onChange={ this.nameValidator }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ loginName }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        </div>
      );
    }
    return (
      <>
        {msg && <Loading />}
        {enviar && <Redirect to="/search" />}
      </>
    );
  }
}

export default Login;
