import React, { forwardRef } from 'react';
import cx from 'class-names';

import styles from './Container.module.sass';

const Container = forwardRef(
  (
    {
      style = {},
      fixed = false,
      className,
      maxWidth = 'lg',
      children,
      component = 'div',
      disableGutters = false,
    },
    ref
  ) => {
    const TagName = component;

    const classes = cx(
      styles.container,
      {
        [styles.disableGutters]: disableGutters,
      },
      className
    );

    return (
      <TagName
        ref={ref}
        className={classes}
        // style={{ maxWidth: fixed && "100%", ...style }}
      >
        {children}
      </TagName>
    );
  }
);

export default Container;
