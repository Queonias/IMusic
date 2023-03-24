import React, { Component } from 'react';
import Header from '../Header';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../Loading';
import MusicCard from '../MusicCard';
import '../../styles/favorites.css';

class Favorites extends Component {
  state = {
    songsFavorits: [],
    loading: false,
  };

  componentDidMount() {
    this.getSongs();
  }

  getSongs = () => {
    this.setState({ loading: true }, async () => {
      const songs = await getFavoriteSongs();
      this.setState({ songsFavorits: songs, loading: false });
    });
  };

  render() {
    const { loading, songsFavorits } = this.state;
    return (
      <div data-testid="page-favorites" className="page-favorites">
        <Header />
        <div className="favorites-container">
          <p>Favoritos</p>
          <div className="favorites-music">
            {loading ? <Loading /> : (songsFavorits.map((song) => (
              <MusicCard
                key={ song.trackId }
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                trackId={ song.trackId }
                song={ song }
                getSongs={ this.getSongs }
              />
            )))}
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
