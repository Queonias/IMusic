import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  state = {
    loading: false,
  };

  handleclick = async (e) => {
    const { addSong, song } = this.props;
    const { target: { checked } } = e;
    if (checked) {
      this.setState({ loading: true }, async () => {
        await addSong(song);
        this.setState({ loading: false });
      });
    }
    console.log(checked);
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;
    return (
      <div>
        { loading && (<span>Carregando...</span>) }
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
