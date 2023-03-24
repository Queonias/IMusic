import React, { Component } from 'react';
import Header from '../Header';
import '../../styles/profileEdit.css';

class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <Header />
        <p>Editar Perfil</p>
      </div>
    );
  }
}

export default ProfileEdit;
