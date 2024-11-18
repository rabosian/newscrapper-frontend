import React from 'react';
import ExitIcon from '../assets/icons/ExitIcon';
import './styles/modal.style.css';

function Modal({ children, setModalOn }) {
  return (
    <div className="modal">
      <div className="modal__content">
        {children}
        <button className="modal__close" onClick={() => setModalOn(false)}>
          <ExitIcon />
        </button>
      </div>
      <div className="modal__back" onClick={() => setModalOn(false)}></div>
    </div>
  );
}

export default Modal;
