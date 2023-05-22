import React, { forwardRef } from 'react';
import Link from 'next/link';
import cx from 'class-names';

import styles from './Button.module.sass';

const Button = forwardRef(
  (
    {
      onClick,
      disabled,
      outlined,
      children,
      className,
      href = '',
      variant = '',
      base = false,
      as = 'button',
      type = 'button',
    },
    ref
  ) => {
    const classes = cx(
      styles[variant],
      styles.button,
      {
        [styles.disabled]: disabled,
        [styles.outlined]: outlined,
        [styles.base]: base,
      },
      className
    );

    if (href) {
      return (
        <Link ref={ref} disabled={disabled} className={classes} href={href}>
          {children}
        </Link>
      );
    }

    const TagName = as;
    const btnType = TagName === 'button' ? { type } : {};

    return (
      <TagName ref={ref} {...btnType} onClick={onClick} disabled={disabled} className={classes}>
        {children}
      </TagName>
    );
  }
);

export default Button;
