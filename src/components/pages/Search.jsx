/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../Header';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../Loading';
import '../../styles/search.css';

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
      <div className="class-main container-fluid">
        <Header />
        <div data-testid="page-search" className="page-search">
          <div className="search-artist">
            <p className="title">Pesquisar</p>
            {/* <div > */}
            <Form className="search-artist-input">
              <Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id=""
                  data-testid="search-artist-input"
                  value={ inputMusic }
                  onChange={ this.validateInput }
                />
              </Form.Label>
              <Button
                type="button"
                data-testid="search-artist-button"
                disabled={ disabled }
                onClick={ this.getAlbum }
                className="search-artist-button"
              >
                Pesquisar
              </Button>
            </Form>
            {/* </div> */}
          </div>
          {loading && <Loading />}
          <div className="results-search">
            {(!listAlbum || listAlbum.length === 0) && pressHandleClick && (
              <h2>Nenhum álbum foi encontrado</h2>
            )}

            {listAlbum && <h2>{`Resultado de álbuns de: ${musicSearched}`}</h2>}

            {listAlbum && (
              <div className="musics">
                {' '}
                {listAlbum.map((music) => (
                  <div key={ music.artistId } className="card-music">
                    <img src={ music.artworkUrl100 } alt={ music.collectionName } />
                    <p>{music.collectionName}</p>
                    <Link
                      to={ `/album/${music.collectionId}` }
                      data-testid={ `link-to-album-${music.collectionId}` }
                      className="link-to-album"
                    >
                      Ir para música
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
