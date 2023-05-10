import React from "react";
import cx from "class-names";

import styles from "./Text.module.sass";

const Text = ({
  as = "p",
  size = "xxl",
  className = "",
  children = null,
  gradient = false,
}) => {
  const TagName = as;
  const classes = cx(
    styles.text,
    {
      [styles.textGradient]: gradient,
      [styles[size]]: size,
    },
    className
  );
  return <TagName className={classes}>{children}</TagName>;
};

export default Text;
