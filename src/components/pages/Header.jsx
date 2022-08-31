import React, { Component } from 'react';
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
    return (
      <div>
        <header data-testid="header-component">
          { loading ? <Loading /> : <h1 data-testid="header-user-name">{nameUser}</h1>}
        </header>
      </div>
    );
  }
}

export default Header;
