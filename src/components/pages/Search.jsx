import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Header';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../Loading';

class Search extends Component {
  constructor(props) {
    super(props);
    this.validateInput = this.validateInput.bind(this);
    this.getAlbum = this.getAlbum.bind(this);

    this.state = {
      inputMusic: '',
      disabled: true,
      listAlbum: undefined,
      pressHandleClick: false,
      musicSearched: '',
    };
  }

  getAlbum() {
    const { inputMusic } = this.state;
    this.setState({ loading: true, musicSearched: inputMusic }, async () => {
      const response = await searchAlbumsAPI(inputMusic);
      this.setState({
        inputMusic: '',
        listAlbum: response,
        pressHandleClick: true,
        loading: false,
      });
    });
  }

  validateInput({ target }) {
    const { value } = target;
    this.setState({ inputMusic: value });
    if (value.length >= 2) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const {
      inputMusic,
      disabled,
      listAlbum,
      pressHandleClick,
      musicSearched,
      loading,
    } = this.state;
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
              value={ inputMusic }
              onChange={ this.validateInput }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabled }
            onClick={ this.getAlbum }
          >
            Pesquisar
          </button>
        </form>
        {loading && <Loading />}
        <div>
          {(!listAlbum || listAlbum.length === 0) && pressHandleClick && (
            <h2>Nenhum álbum foi encontrado</h2>
          )}

          {listAlbum && <h2>{`Resultado de álbuns de: ${musicSearched}`}</h2>}

          {listAlbum
            && listAlbum.map((music) => (
              <div key={ music.artistId }>
                <img src={ music.artworkUrl100 } alt={ music.collectionName } />
                <p>{music.collectionName}</p>
                <Link
                  to={ `/album/${music.collectionId}` }
                  data-testid={ `link-to-album-${music.collectionId}` }
                >
                  Ir para música
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

// Search.propTypes = {
//   getAlbum: PropTypes.string.isRequired,
//   trackId: PropTypes.number.isRequired,
//   addFavorites: PropTypes.func.isRequired,
//   checked: PropTypes.bool.isRequired,
// };

export default Search;
