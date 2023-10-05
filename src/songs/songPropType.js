import PropTypes from 'prop-types';

export default PropTypes.shape({
  song_id: PropTypes.int,
  song_title: PropTypes.string,
  artist_name: PropTypes.string,
  album_title: PropTypes.string,
  music_url: PropTypes.string,
});
