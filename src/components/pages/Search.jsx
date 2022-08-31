import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    search: true,
    inputValue: '',
    loading: false,
    listMusic: [],
    searchAlbum: '',
  };

  validateArtistName = ({ target }) => {
    const { value } = target;
    if (value.length >= 2) {
      this.setState({ search: false, inputValue: value, searchAlbum: value });
    } else {
      this.setState({ search: true, inputValue: value, searchAlbum: value });
    }
  };

  handleclick = async () => {
    const { inputValue } = this.state;
    this.setState(
      { inputValue: '', loading: true, listMusic: [] },
      async () => {
        const arryMusic = await searchAlbumsAPI(inputValue);
        console.log(arryMusic);
        this.setState({ loading: false, listMusic: arryMusic });
      },
    );
  };

  render() {
    const { search, inputValue, loading, listMusic, searchAlbum } = this.state;
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
                value={ inputValue }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ search }
              onClick={ this.handleclick }
            >
              Pesquisar
            </button>
          </div>
          {loading && <Loading />}
          {listMusic.length > 0 && (
            <div>
              <h2>{`Resultado de álbuns de: ${searchAlbum}`}</h2>
              {listMusic.map((artistMusic) => (
                <div key={ artistMusic.artistId }>
                  <img
                    src={ artistMusic.artworkUrl100 }
                    alt={ artistMusic.artistName }
                  />
                  <p>{artistMusic.collectionName}</p>
                  {/* <p>{artistMusic.artistName}</p> */}
                  {/* <p>{artistMusic.collectionId}</p> */}
                  {/* <p>{artistMusic.collectionName}</p> */}
                  <Link
                    to={ `/album/${artistMusic.collectionId}` }
                    data-testid={ `link-to-album-${artistMusic.collectionId}` }
                  >
                    {artistMusic.collectionId}
                  </Link>
                </div>
              ))}
            </div>
          )}
          {listMusic.length === 0 && <h2>Nenhum álbum foi encontrado</h2>}
        </form>
      </div>
    );
  }
}

export default Search;
