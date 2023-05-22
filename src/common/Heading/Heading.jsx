import { forwardRef } from 'react';
import cx from 'class-names';

import styles from './Heading.module.sass';

const Heading = forwardRef(({ as = 'h1', size = 'xxl', className, children }, ref) => {
  const TagName = as;
  const classes = cx(styles.heading, styles[size], className);

  return (
    <TagName ref={ref} className={classes}>
      {children}
    </TagName>
  );
});

export default Heading;
