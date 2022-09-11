import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    musicSalve: false,
  };

  componentDidMount() {
    this.musicFavorits();
  }

  musicFavorits = async () => {
    const { trackId } = this.props;
    this.setState({ loading: true });
    const music = await getFavoriteSongs();
    const isTrue = music.some((song) => song.trackId === trackId);
    this.setState({ musicSalve: isTrue, loading: false });
  };

  handleclick = async (e) => {
    const { addSong, song } = this.props;
    const {
      target: { checked },
    } = e;
    if (checked) {
      this.setState({ loading: true }, async () => {
        await addSong(song);
        this.setState({ loading: false, musicSalve: true });
      });
    } else {
      this.setState({ musicSalve: false });
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, musicSalve } = this.state;
    return (
      <div>
        {loading && <span>Carregando...</span>}
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `${trackId}` }>
          Favorita
          <input
            id={ `${trackId}` }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ (e) => this.handleclick(e) }
            checked={ musicSalve }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  addSong: PropTypes.func.isRequired,
  song: PropTypes.shape.isRequired,
};

export default MusicCard;
