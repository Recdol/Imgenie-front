import { React } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import CardGen from './CardGenerator';
import exitSvg from './svgs/exit.svg';

function Modal({ setOpenModal, imgUrl, artistName, musicTitle }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button
          className="titleCloseBtn"
          type="button"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <img src={exitSvg} alt="exit icon" />
        </button>
        <CardGen
          imgUrl={imgUrl}
          musicTitle={musicTitle}
          artistName={artistName}
        />
      </div>
    </div>
  );
}

Modal.propTypes = {
  setOpenModal: PropTypes.bool.isRequired,
  imgUrl: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  musicTitle: PropTypes.string.isRequired,
};

export default Modal;
