import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/header.css';

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
      <header data-testid="header-component" className="header-component">
        {loading ? (
          <Loading />
        ) : (
          <div className="div-main">
            <p data-testid="header-user-name" className="name">{name}</p>
            <div className="menu">
              <Link to="/search" data-testid="link-to-search" className="link">
                Pesquisa
              </Link>
              <Link to="/favorites" data-testid="link-to-favorites" className="link">
                Músicas favoritas
              </Link>
              <Link to="/profile" data-testid="link-to-profile" className="link">
                Perfil
              </Link>
            </div>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
