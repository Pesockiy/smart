import { useState } from 'react';
import cx from 'class-names';

import IconClose from '@/assets/icons/close.svg';

import styles from './Alert.module.sass';

const Alert = ({
  children,
  className,
  closeButton,
  iconClassName,
  isLayer,
  isVisible = false,
  onClose = () => {},
}) => {
  const classes = cx(styles.alert, className);

  const [visible, setVisible] = useState(isVisible);

  if (!isVisible) return null;

  const closeHandler = () => {
    onClose();
    setVisible(false);
  };

  return (
    <>
      {isLayer && <div className={styles.alertLayer} />}
      <div className={classes}>
        {children}
        {closeButton && (
          <button onClick={onClose} className={cx(styles.alertCloseButton, iconClassName)}>
            <IconClose />
          </button>
        )}
      </div>
    </>
  );
};

export default Alert;
