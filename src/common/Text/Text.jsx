import { forwardRef } from 'react';
import cx from 'class-names';

import styles from './Text.module.sass';

const Text = forwardRef(
  ({ as = 'p', size = 'xxl', className = '', children = null, gradient = false }, ref) => {
    const TagName = as;
    const classes = cx(
      styles.text,
      {
        [styles.textGradient]: gradient,
        [styles[size]]: size,
      },
      className
    );
    return <TagName ref={ref} className={classes}>{children}</TagName>;
  }
);

export default Text;
