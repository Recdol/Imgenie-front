import React, { useEffect, useRef } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { useLocation, useNavigate } from 'react-router-dom';
import QueryString from 'qs';
import { drawCard } from '../../cards/draw';
import defaultImg from '../../imgs/dummy512.jpg';
import defaultSongs from '../../songs/defaultSongs';
import 'react-h5-audio-player/lib/styles.css';
import './style.css';

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const canvasRef = useRef();
  const imgRef = useRef();
  const playerRef = useRef();

  const query = QueryString.parse(location.search, { ignoreQueryPrefix: true });

  const defaultSong = defaultSongs[0];
  const song = {
    song_title: query.songTitle ?? defaultSong.song_title,
    artist_name: query.artistName ?? defaultSong.artist_name,
    album_title: query.albumTitle ?? defaultSong.album_title,
    music_url: query.musicUrl ?? defaultSong.music_url,
  };
  const imageUrl = query.imageUrl ?? defaultImg;

  useEffect(() => {
    drawCard(canvasRef, imgRef, song, imageUrl);
  });

  return (
    <div className="ResultPage">
      <div className="header">
        <h1>내 일상에 어울리는 노래는</h1>
      </div>
      <div className="contents">
        <div className="card">
          <canvas ref={canvasRef} style={{ width: '0%' }} />
          <img ref={imgRef} alt="card" />
        </div>
        <div className="playerBox">
          <AudioPlayer
            customAdditionalControls={[RHAP_UI.LOOP]}
            className="audio"
            autoPlay={false}
            src={song.music_url}
            volume={0.3}
            timeFormat="mm:ss"
            defaultCurrentTime="00:00"
            showJumpControls={false}
            ref={playerRef}
          />
        </div>
      </div>
      <div className="footer">
        <button className="retry" type="button" onClick={() => navigate('/')}>
          음악 추천 받으러 가기
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
