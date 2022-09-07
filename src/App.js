import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './components/pages/Album';
import Favorites from './components/pages/Favorites';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Profile from './components/pages/Profile';
import ProfileEdit from './components/pages/ProfileEdit';
import Search from './components/pages/Search';

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.getAlbum = this.getAlbum.bind(this);
  // }

  // getAlbum() {
  //   console.log('Olá');
  // }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
          <Route
            exact
            path="/search"
            render={ (props) => <Search { ...props } /> }
          />
          <Route
            exact
            path="/album/:id"
            render={ (props) => <Album { ...props } /> }
          />
          <Route
            exact
            path="/favorites"
            render={ (props) => <Favorites { ...props } /> }
          />
          <Route
            exact
            path="/profile"
            render={ (props) => <Profile { ...props } /> }
          />
          <Route
            exact
            path="/profile/edit"
            render={ (props) => <ProfileEdit { ...props } /> }
          />
          <Route exact path="*" render={ (props) => <NotFound { ...props } /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
