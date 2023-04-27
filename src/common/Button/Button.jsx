import React from "react";
import Link from "next/link";
import cx from "class-names";

import styles from "./Button.module.sass";

export default function Button({
  onClick = () => {},
  disabled = false,
  outlined = false,
  children = null,
  className = "",
  as = "button",
  variant = "",
  href = "",
}) {
  const classes = cx(styles[variant], styles.button, className, {
    [styles.disabled]: disabled,
    [styles.outlined]: outlined,
  });

  if (href) {
    return (
      <Link disabled={disabled} className={classes} href={href}>
        {children}
      </Link>
    );
  } else {
    const TagName = as;
    return (
      <TagName onClick={onClick} disabled={disabled} className={classes}>
        {children}
      </TagName>
    );
  }
}
