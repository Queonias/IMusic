import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor(props) {
    super(props);
    this.getNameUser = this.getNameUser.bind(this);

    this.state = {
      name: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getNameUser();
  }

  async getNameUser() {
    this.setState({ loading: true }, async () => {
      const response = await getUser();
      this.setState({ name: response.name, loading: false });
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h1 data-testid="header-user-name">{name}</h1>
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
        )}
      </header>
    );
  }
}

export default Header;
