import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../Header';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';
import '../../styles/profile.css';
import imageProfile from '../../images/profileImage.png';

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
      <div data-testid="page-profile" className="page-profile">
        <Header />
        {loading && <Loading />}
        {showScreen && (<div className="profile">

          <div className="user-div">
            <span>{NameUser.name}</span>
            <span>{NameUser.description}</span>
            <span>{NameUser.email}</span>
            <img
              src={ `${NameUser.image ? NameUser.image : imageProfile}` }
              alt="Foto do usuário"
              data-testid="profile-image"
            />
          </div>

          <Link to="/profile/edit" className="link-profile">
            <Button className="button" onClick={ this.handleclick }>
              Editar perfil
            </Button>
          </Link>
        </div>
        )}
      </div>
    );
  }
}

export default Profile;
