import React, { Component } from 'react';
import Header from './Header';

class Search extends Component {
  state = {
    // artistSearch: '',
    search: true,
  };

  validateArtistName = ({ target }) => {
    // const { artistSearch } = this.state;
    const { value } = target;
    if (value.length >= 2) {
      this.setState({ search: false });
    } else {
      this.setState({ search: true });
    }
  };

  render() {
    const { search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <div>
            <label htmlFor="search-artist-input">
              <input
                type="text"
                name="musicGroup"
                id="search-artist-input"
                placeholder="Nome do Artista"
                data-testid="search-artist-input"
                onChange={ this.validateArtistName }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ search }
            >
              Pesquisar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
