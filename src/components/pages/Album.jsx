import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);
    this.getMusicsForIds = this.getMusicsForIds.bind(this);

    this.state = {
      songs: undefined,
      author: '',
    };
  }

  componentDidMount() {
    this.getMusicsForIds();
  }

  async getMusicsForIds() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await getMusics(id);
    const songs = response.filter((_, i) => i >= 1);
    const author = response.filter((_, i) => i === 0)[0];

    this.setState({ author, songs });
  }

  render() {
    const { songs, author } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
        <p data-testid="artist-name">{author.artistName}</p>
        <p data-testid="album-name">{author.collectionName}</p>
        <div>
          { songs && songs.map((song) => (
            <MusicCard
              key={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
            />
          ))}
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
