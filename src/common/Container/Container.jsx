import React from "react";
import cx from "class-names";

import styles from "./Container.module.sass";

const Container = ({
  style = {},
  fixed = false,
  className = "",
  maxWidth = "lg",
  children = null,
  component = "div",
  disableGutters = false,
}) => {
  const TagName = component;

  const classes = cx(
    styles.container,
    {
      [styles.disableGutters]: disableGutters,
      [styles.maxWidth]: maxWidth,
    },
    className
  );

  return (
    <TagName
      className={classes}
      style={{ maxWidth: fixed && "100%" , ...style }}
    >
      {children}
    </TagName>
  );
};

export default Container;
