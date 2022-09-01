import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../../services/musicsAPI';
import MusicCard from './MusicCard';
import { addSong } from '../../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  state = {
    musicAPI: {},
    response: false,
    idsOfMusicsSalve: [],
    loading: true,
  };

  componentDidMount() {
    this.getMusicAPI();
  }

  async getMusicAPI() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const musics = await getMusics(id);
    this.setState({ response: false }, () => {
      this.setState({ musicAPI: musics, response: true });
    });
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

  render() {
    const { musicAPI, response, loading, idsOfMusicsSalve } = this.state;

    if (response && loading) {
      const { artistName, collectionName } = musicAPI[0];
      return (
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
                        checked={ idsOfMusicsSalve.some(
                          (idsSave) => Number(idsSave) === Number(trackId),
                        ) }
                        arr={ idsOfMusicsSalve }
                      />
                    </div>
                  );
                }
                return '';
              })}
            </div>
          )}
        </div>
      );
    }
    if (!loading) {
      return <Loading />;
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
