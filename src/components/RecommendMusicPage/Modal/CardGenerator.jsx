import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isIOS } from 'react-device-detect';
import defaultImg from '../../../imgs/dummy512.jpg';
import kakaoShareSvg from './svgs/kakaoShare.svg';
import downloadSvg from './svgs/download.svg';
import { drawBackgroundMusicCard, drawQueryImage } from './draw';

const { Kakao } = window;
const myHost = `${window.location.protocol}//${window.location.host}`;

function CardGenerator({ imgUrl, artistName, musicTitle }) {
  const canvasRef = useRef();
  const imgRef = useRef();

  useEffect(() => {
    // kakao
    Kakao.cleanup();
    Kakao.init(process.env.REACT_APP_KAKAO_DEV_JS_API_KEY);

    const canvas = canvasRef.current;
    // origin: 525
    canvas.width = 525;
    // origin: 884
    canvas.height = 884;

    let newmusicTitle = musicTitle;
    let newartistName = artistName;
    const musicTitleThreshold = canvas.width - canvas.width * 0.25;
    const artistNameThreshold = canvas.width + canvas.width * 0.15;

    const ctx = canvas.getContext('2d');
    // font color
    ctx.fillStyle = 'black';

    drawBackgroundMusicCard(canvas, ctx, (backgroundImgTag) => {
      // title
      ctx.font = `${
        backgroundImgTag.width - backgroundImgTag.width * 0.918
      }px Arial`;

      if (ctx.measureText(newmusicTitle).width > musicTitleThreshold) {
        let left = 0;
        let right = newmusicTitle.length;
        let mid;
        let nowWidth;

        while (left <= right) {
          mid = Math.ceil((left + right) / 2);
          nowWidth = ctx.measureText(
            newmusicTitle.substring(0, mid).concat('...')
          ).width;
          if (nowWidth <= musicTitleThreshold) {
            left = mid + 1;
          }
          if (nowWidth > musicTitleThreshold) {
            right = mid - 1;
          }
        }
        newmusicTitle = newmusicTitle.substring(0, left).concat('...');
      }

      ctx.fillText(
        newmusicTitle,
        backgroundImgTag.width - backgroundImgTag.width * 0.903,
        backgroundImgTag.height - backgroundImgTag.height * 0.293
      );

      if (ctx.measureText(newartistName).width > artistNameThreshold) {
        let left = 0;
        let right = newartistName.length;
        let mid;
        let nowWidth;

        while (left <= right) {
          mid = Math.ceil((left + right) / 2);
          nowWidth = ctx.measureText(
            newartistName.substring(0, mid).concat('...')
          ).width;
          if (nowWidth <= artistNameThreshold) {
            left = mid + 1;
          }
          if (nowWidth > artistNameThreshold) {
            right = mid - 1;
          }
        }
        newartistName = newartistName.substring(0, left).concat('...');
      }

      // artist
      ctx.font = `${
        backgroundImgTag.width - backgroundImgTag.width * 0.9543
      }px Arial`;
      ctx.fillText(
        `By. ${newartistName}`,
        backgroundImgTag.width - backgroundImgTag.width * 0.903,
        backgroundImgTag.height - backgroundImgTag.height * 0.25
      );

      drawQueryImage(canvas, ctx, imgUrl, backgroundImgTag, () => {
        const dataURL = canvas.toDataURL('image/png');
        imgRef.current.src = dataURL;
      });
    });
  }, [artistName, imgUrl, musicTitle]);

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

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '내 일상에 어울리는 노래는,',
        description: `${musicTitle} By. ${artistName}`,
        imageUrl: imgUrl,
        link: {
          mobileWebUrl: myHost,
          webUrl: myHost,
        },
      },
      buttons: [
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

CardGenerator.defaultProps = {
  imgUrl: defaultImg,
  artistName: '아티스트 이름',
  musicTitle: '음악 제목',
};

CardGenerator.propTypes = {
  imgUrl: PropTypes.string,
  artistName: PropTypes.string,
  musicTitle: PropTypes.string,
};

export default CardGenerator;
