import { React } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import CardGen from './CardGenerator';
import exitSvg from './svgs/exit.svg';
import songPropType from '../../../songs/songPropType';

function Modal({ setOpenModal, imgUrl, song }) {
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
        <CardGen imgUrl={imgUrl} song={song} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  setOpenModal: PropTypes.bool.isRequired,
  imgUrl: PropTypes.string.isRequired,
  song: songPropType.isRequired,
};

export default Modal;
