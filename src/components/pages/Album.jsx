import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../../services/musicsAPI';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  state = {
    musicAPI: [],
    response: false,
    idsOfMusicsSalve: [],
    loading: true,
    savedSongs: [],
  };

  componentDidMount() {
    this.getMusicAPI();
    console.log('componentDidMount');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  async getMusicAPI() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const musics = await getMusics(id);
    const songs = await getFavoriteSongs();
    this.setState({ response: false }, () => {
      this.setState({ musicAPI: musics, savedSongs: songs }, () => {
        this.setState({ response: true });
      });
    });
    this.updateSongs();
  }

  addFavorites = ({ target }) => {
    const { id, checked } = target;
    const { musicAPI } = this.state;
    const { idsOfMusicsSalve } = this.state;
    if (checked) {
      const musicSalve = musicAPI.filter((obj) => obj.trackId === Number(id));
      this.setState(
        (prevEvent) => ({
          idsOfMusicsSalve: [...prevEvent.idsOfMusicsSalve, id],
          loading: false,
        }),
        async () => {
          await addSong(musicSalve);
          this.setState({ loading: true });
        },
      );
    } else {
      const newArray = idsOfMusicsSalve.filter(
        (idNewArray) => idNewArray !== id,
      );
      this.setState({ idsOfMusicsSalve: newArray });
    }
  };

  updateSongs() {
    const { savedSongs } = this.state;
    const idsSalve = savedSongs.map((obj) => obj[0].trackId.toString());
    this.setState({ idsOfMusicsSalve: [...idsSalve] });
  }

  // refreshScreen() {
  //   const { savedSongs } = this.state;
  //   const idsSalve = savedSongs.map((obj) => obj[0].trackId.toString());
  //   this.setState({ idsOfMusicsSalve: [...idsSalve] });
  // }

  render() {
    // this.updateSongs();
    const { musicAPI, response, loading, idsOfMusicsSalve, savedSongs } = this.state;
    console.log('render');
    if (response) {
      const { artistName, collectionName } = musicAPI[0];
      return (
        <>
          {!loading && <Loading />}
          <div data-testid="page-album">
            <Header />
            {response && (
              <div>
                <p data-testid="artist-name">{artistName}</p>
                <p data-testid="album-name">{collectionName}</p>
                {musicAPI.map(({ trackName, previewUrl, trackId }, i) => {
                  if (i >= 1) {
                    return (
                      <div key={ trackId }>
                        <p>{trackName}</p>
                        <MusicCard
                          previewUrl={ previewUrl }
                          trackId={ trackId }
                          addFavorites={ this.addFavorites }
                          checked={ (idsOfMusicsSalve.some(
                            (idsSave) => Number(idsSave) === Number(trackId),
                          )) }
                        />
                      </div>
                    );
                  }
                  return '';
                })}
              </div>
            )}
          </div>
        </>
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <p data-testid="artist-name">Carregando...</p>
          <p data-testid="album-name">Carregando...</p>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
