import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../Header';

class Album extends Component {
  render() {
    // const { collectionName, artistName, artworkUrl100 } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
      </div>
    );
  }
}

// Album.propTypes = {
//   collectionName: PropTypes.string.isRequired,
//   artistName: PropTypes.string.isRequired,
//   artworkUrl100: PropTypes.string.isRequired,
// };

export default Album;
