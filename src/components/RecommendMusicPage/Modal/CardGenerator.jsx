import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isIOS } from 'react-device-detect';
import kakaoShareSvg from './svgs/kakaoShare.svg';
import downloadSvg from './svgs/download.svg';
import { drawCard } from '../../../cards/draw';
import songPropType from '../../../songs/songPropType';

const { Kakao } = window;
const myHost = `${window.location.protocol}//${window.location.host}`;

function encodeParams(params) {
  return Object.entries(params)
    .map((kv) => kv.map(encodeURIComponent).join('='))
    .join('&');
}

function CardGenerator({ imgUrl, song }) {
  const canvasRef = useRef();
  const imgRef = useRef();

  useEffect(() => {
    // kakao
    Kakao.cleanup();
    Kakao.init(process.env.REACT_APP_KAKAO_DEV_JS_API_KEY);

    drawCard(canvasRef, imgRef, song, imgUrl);
  });

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'card_image.png';
      link.click();
    }
  }, [canvasRef]);

  const resultUrl = `${myHost}/result?${encodeParams({
    songTitle: song.song_title,
    artistName: song.artist_name,
    albumTitle: song.album_title,
    musicUrl: song.music_url,
    imageUrl: imgUrl,
  })}`;

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '내 일상에 어울리는 노래는,',
        description: `${song.song_title} By. ${song.artist_name}`,
        imageUrl: imgUrl,
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
      buttons: [
        {
          title: '결과 보러가기',
          link: {
            mobileWebUrl: resultUrl,
            webUrl: resultUrl,
          },
        },
        {
          title: '나도 해보기',
          link: {
            mobileWebUrl: myHost,
            webUrl: myHost,
          },
        },
      ],
    });
  };

  if (isIOS) {
    return (
      <div className="cardGen">
        <div className="cardHeader">
          <span>이미지를 길게 눌러 저장하기</span>
        </div>
        <div className="title">
          <canvas ref={canvasRef} style={{ width: '0%' }} />
          <img ref={imgRef} style={{ width: '100%' }} alt="card" />
        </div>
        <div className="shareTitle">
          <span>주변에 공유하기</span>
        </div>
        <div className="bottom">
          <button className="shareBtn" type="button" onClick={shareKakao}>
            <img src={kakaoShareSvg} alt="kakao share button" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cardGen">
      <div className="title">
        <canvas ref={canvasRef} style={{ width: '0%' }} />
        <img ref={imgRef} style={{ width: '100%' }} alt="card" />
      </div>
      <div className="shareTitle">
        <span>주변에 공유하기</span>
      </div>
      <div className="bottom">
        <button className="shareBtn" type="button" onClick={handleDownload}>
          <img src={downloadSvg} alt="download button" />
        </button>
        <button className="shareBtn" type="button" onClick={shareKakao}>
          <img src={kakaoShareSvg} alt="kakao share button" />
        </button>
      </div>
    </div>
  );
}

CardGenerator.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  song: songPropType.isRequired,
};

export default CardGenerator;
