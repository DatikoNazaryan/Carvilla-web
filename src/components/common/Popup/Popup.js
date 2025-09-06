import { createPortal } from 'react-dom';

import { ReactComponent as CloseIcon } from 'assets/images/close.svg';

import styles from './Popup.module.scss';

function Popup({ children, onClose, className }) {
  const popupPlaceholder = document.getElementById('popupPlaceholder');

  const element = (
    <dialog className={styles.container} onClick={onClose}>
      <div 
        className={className ? className : styles.content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <CloseIcon className={styles.closeIcon} onClick={onClose} />
      </div>
    </dialog>
  );

  return createPortal(element, popupPlaceholder);
}

export default Popup;