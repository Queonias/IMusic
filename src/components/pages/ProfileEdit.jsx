import React, { Component } from 'react';
import Header from '../Header';

class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <p>Editar Perfil</p>
        <Header />
      </div>
    );
  }
}

export default ProfileEdit;
