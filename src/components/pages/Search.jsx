import React, { Component } from 'react';
import Header from '../Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <p>Pesquisa</p>
        <Header />
      </div>
    );
  }
}

export default Search;
