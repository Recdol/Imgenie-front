import React from 'react';
import spinnerSvg from './svgs/spinner.svg';
import './style.css';

function LoadingPage() {
  return (
    <div className="contents">
      <div className="LoadingPage">
        <h1 className="title">노래를 찾고있어요</h1>
        <p className="decription">
          1분 뒤면 결과를 볼 수 있습니다!
          <br />
          화면을 이탈하면 오류가 날 수 있으니 조금만 기다려주세요
        </p>
        <img className="Spinner" src={spinnerSvg} alt="spinner" />
      </div>
    </div>
  );
}

export default LoadingPage;
