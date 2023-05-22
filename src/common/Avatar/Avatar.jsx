import { forwardRef } from 'react';

import cx from 'class-names';

import Img from '@/common/Img/Img';

import styles from './Avatar.module.sass';

const Avatar = forwardRef(
  ({ className, variant, src, alt, width = '100', height = '100', size = 'lg', ...rest }, ref) => {
    const classes = cx(styles.avatar, {
      [styles[variant]]: variant,
      [styles[size]]: size,
      className,
    });

    return (
      <Img
        src={src}
        alt={alt}
        ref={ref}
        className={classes}
        width={width}
        height={height}
        {...rest}
      />
    );
  }
);
export default Avatar;
