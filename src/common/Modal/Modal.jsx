import { useState } from 'react';
import cx from 'class-names';

import IconClose from '@/assets/icons/close.svg';

import styles from './Modal.module.sass';

const Modal = ({
  children,
  className,
  isVisible = true,
  closeButton = true,
  onClose = () => {},
}) => {
  const classes = cx(styles.modal, className);

  const [visible, setVisible] = useState(isVisible);

  const closeHandler = () => {
    onClose(setVisible(false));
  };

  if (!visible) return;

  return (
    <div className={classes}>
      <div className={styles.modalDialog}>{children}</div>
      {closeButton && (
        <button onClick={closeHandler} className={styles.modalCloseButton}>
          <IconClose />
        </button>
      )}
    </div>
  );
};

export default Modal;
