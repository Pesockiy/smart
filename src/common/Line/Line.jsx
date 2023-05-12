import { forwardRef } from 'react';
import cx from 'class-names';

import styles from './Line.module.sass';

const Line = forwardRef(({ width = '32px', inline = false, className = '' }, ref) => {
  const classes = cx(
    styles.line,
    {
      [styles.inline]: inline,
    },
    className
  );

  return <div ref={ref} style={{ width: width }} className={classes} />;
});

export default Line;
