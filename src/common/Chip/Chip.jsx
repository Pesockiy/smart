import { forwardRef } from 'react';
import cx from 'class-names';

import styles from './Chip.module.sass';

const Chip = forwardRef(
  ({ label, color, variant = 'primary', className, as = 'div', onClick = () => {} }, ref) => {
    const classes = cx(styles[variant], styles.chip, className, {
      [styles.color]: color,
    });

    const TagName = as;
    return (
      <TagName ref={ref} onClick={onClick} className={classes}>
        {label}
      </TagName>
    );
  }
);

export default Chip;
