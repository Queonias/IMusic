import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';

class Profile extends Component {
  state = {
    loading: false,
    NameUser: [],
    showScreen: false,
  };

  componentDidMount() {
    this.userScreen();
  }

  userScreen = () => {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({ NameUser: user, loading: false, showScreen: true });
    });
  };

  render() {
    const { loading, showScreen, NameUser } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading && <Loading />}
        {showScreen && (
          <div>
            <span>{NameUser.name}</span>
            <span>{NameUser.description}</span>
            <span>{NameUser.email}</span>
            <img
              src={ `${NameUser.image}` }
              alt="Foto do usuário"
              data-testid="profile-image"
            />
          </div>
        )}
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
