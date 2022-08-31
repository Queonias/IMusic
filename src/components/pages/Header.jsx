import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    nameUser: '',
    loading: true,
  };

  componentDidMount() {
    this.fetchName();
  }

  async fetchName() {
    this.setState({ loading: true }, async () => {
      const response = await getUser();
      const { name } = response;
      this.setState({ loading: false, nameUser: name });
    });
  }

  render() {
    const { nameUser, loading } = this.state;
    const header = (
      <div>
        <h1 data-testid="header-user-name">{nameUser}</h1>
        <Link to="/search" data-testid="link-to-search">
          Pesquisa
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Músicas favoritas
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Perfil
        </Link>
      </div>
    );
    return (
      <div>
        <header data-testid="header-component">
          {loading ? <Loading /> : header}
        </header>
      </div>
    );
  }
}

export default Header;
