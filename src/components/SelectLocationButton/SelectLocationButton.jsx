import { memo } from 'react';
import cx from 'class-names';

import Button from '@/common/Button/Button';
import Arrow from '@/assets/icons/arrow.svg';

import styles from './SelectLocationButton.module.sass';

const SelectLocationButton = ({ className, openMenuHandler }) => {
  return (
    <Button
      ooutlined
      variant="secondary"
      className={cx(styles.selectLangButton, className)}
      onClick={openMenuHandler}
    >
      City
      <Arrow className={styles.arrow} />
    </Button>
  );
};

export default memo(SelectLocationButton);
