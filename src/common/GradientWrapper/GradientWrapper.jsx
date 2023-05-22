import React from 'react';
import cx from 'class-names';

import styles from './GradientWrapper.module.sass';

const GradientWrapper = ({ className, children }) => {
  return <div className={cx(styles.wrapper, className)}>{children}</div>;
};

export default GradientWrapper;
