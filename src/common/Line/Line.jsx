import React from "react";
import cx from "class-names";

import styles from "./Line.module.sass";

const Line = ({ width = "32px", inline = false, className = "" }) => {
  const classes = cx(
    styles.line,
    {
      [styles.inline]: inline,
    },
    className
  );

  return <div style={{ width: width }} className={classes} />;
};

export default Line;
