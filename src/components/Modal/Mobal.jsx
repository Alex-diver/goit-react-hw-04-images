import ReactModal from 'react-modal';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1200,
  },
  content: {
    backgroundColor: 'transparent',
    border: 'none',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#root');

export const Modal = ({ isOpen, largeImageURL, tags, onClose }) => {
  return (
    <ReactModal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterOpen={() => disableBodyScroll(document)}
      onAfterClose={() => enableBodyScroll(document)}
    >
      <img src={largeImageURL} alt={tags} />
    </ReactModal>
  );
};
