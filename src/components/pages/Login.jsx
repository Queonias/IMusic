/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUser } from '../../services/userAPI';
import Loading from '../Loading';
import '../../styles/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div data-testid="page-login" className="container-login container-fluid">
        <div className="login-form">
          {msg && <Loading />}
          <Form>
            <Form.Group className="mb-3 name-imput" controlId="formBasicEmail">
              {/* <Form.Label>Nome do Usuário</Form.Label> */}
              <h1>Login</h1>
              <Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="login-name-input"
                  placeholder="Digite o seu nome"
                  onChange={ this.nameValidator }
                  value={ nameUser }
                  data-testid="login-name-input"
                />

              </Form.Label>
            </Form.Group>
            <Button
              type="button"
              onClick={ this.handleclick }
              disabled={ loginName }
              data-testid="login-submit-button"
            >
              Entrar
            </Button>
          </Form>
          {enviar && <Redirect to="/search" />}
        </div>
      </div>
    );
  }
}

export default Login;
