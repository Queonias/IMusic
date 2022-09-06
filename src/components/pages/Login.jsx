import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../Loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleclick = this.handleclick.bind(this);

    this.state = {
      nameUser: '',
      loginName: true,
      enviar: false,
      msg: false,
    };
  }

  async handleclick() {
    const { nameUser } = this.state;
    this.setState({ msg: true }, async () => {
      await createUser({ name: nameUser });
      this.setState({ msg: false, enviar: true });
    });
  }

  nameValidator = ({ target }) => {
    const numMinCaracter = 3;
    const { value } = target;
    if (value.length >= numMinCaracter) {
      this.setState({ loginName: false, nameUser: value });
    } else this.setState({ loginName: true, nameUser: value });
  };

  render() {
    const { loginName, nameUser, msg, enviar } = this.state;
    return (
      <div data-testid="page-login">
        {msg && <Loading />}
        <p>Longin</p>
        <form>
          <label htmlFor="login-name-input">
            <input
              type="text"
              name="name"
              id="login-name-input"
              placeholder="Nome"
              onChange={ this.nameValidator }
              value={ nameUser }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="button"
            onClick={ this.handleclick }
            disabled={ loginName }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
        {enviar && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
