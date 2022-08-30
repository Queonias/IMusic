import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './components/pages/Album';
import Favorites from './components/pages/Favorites';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import Search from './components/pages/Search';
import ProfileEdit from './components/pages/ProfileEdit';
import NotFound from './components/pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/page/not/found" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
