import React from 'react';
import ReactDOM from 'react-dom';
import classes from '../../styles/Modal.module.css';

// eslint-disable-next-line react/prop-types
function Backdrop({ onClose }) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={classes.backdrop}
      role="button"
      tabIndex="0"
      aria-label="Close modal"
      onClick={onClose}
    />
  );
}

// eslint-disable-next-line react/prop-types
function ModalOverlay({ children }) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

const portalElement = document.getElementById('overlays');

// eslint-disable-next-line react/prop-types
function Modal({ children, onClose }) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement,
      )}
    </>
  );
}

export default Modal;
