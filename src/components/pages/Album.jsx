import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  state = {
    musicAPI: {},
    reponse: false,
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
    this.setState({ reponse: false }, () => {
      this.setState({ musicAPI: musics, reponse: true });
    });
  }

  render() {
    const { musicAPI, reponse } = this.state;

    if (reponse) {
      const { artistName, collectionName } = musicAPI[0];

      return (
        <div data-testid="page-album">
          <Header />
          {reponse && (
            <div>
              <p data-testid="artist-name">{artistName}</p>
              <p data-testid="album-name">{collectionName}</p>
              {musicAPI.map(({ artistId, trackName, previewUrl }, i) => {
                if (i >= 1) {
                  return (
                    <div key={ artistId }>
                      <p>{trackName}</p>
                      <MusicCard previewUrl={ previewUrl } />
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
