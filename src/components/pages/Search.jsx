import React, { Component } from 'react';
import Header from '../Header';

class Search extends Component {
  constructor(props) {
    super(props);
    this.validateInput = this.validateInput.bind(this);

    this.state = {
      music: '',
      disabled: true,
    };
  }

  validateInput({ target }) {
    const { value } = target;
    this.setState({ music: value });
    if (value.length >= 2) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { music, disabled } = this.state;
    return (
      <div data-testid="page-search">
        <p>Pesquisa</p>
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            <input
              type="text"
              name="name"
              id=""
              data-testid="search-artist-input"
              value={ music }
              onChange={ this.validateInput }
            />
          </label>
          <button type="button" data-testid="search-artist-button" disabled={ disabled }>
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
