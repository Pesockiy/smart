import React from "react";
import cx from "class-names";

import styles from "./Heading.module.sass";

const Heading = ({
  as = "h1",
  size = "xxl",
  className = "",
  children = null,
}) => {
  const TagName = as;
  const classes = cx(styles.heading, styles[size], className);

  return <TagName className={classes}>{children}</TagName>;
};

export default Heading;
