import cx from 'class-names';

import Chip from '@/common/Chip/Chip';
import styles from './PostChip.module.sass';

const label = {
  pdf: 'PDF file',
  website: 'Website',
  video: 'Video',
};

const variants = {
  pdf: 'secondary',
  website: 'primary',
  video: 'primary',
};

export const PostChip = ({ type }) => {
  const classes = cx(styles.chip);

  return (
    <Chip label={label[type]} variant={variants[type]} className={classes} />
  );
};
