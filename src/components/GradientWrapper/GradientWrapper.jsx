import cx from 'class-names';

import styles from './GradientWrapper.module.sass';

const GradientWrapper = ({ className, children }) => {
  return <div className={cx(styles.gradientWrapper, className)}>{children}</div>;
};

export default GradientWrapper;
