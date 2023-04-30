import React from "react";
import cx from "class-names";

import styles from "./Chip.module.sass";

const Chip = ({
  label,
  color,
  variant = "primary",
  className,
  as = "span",
  onClick = () => {},
}) => {
  const classes = cx(styles[variant], styles.chip, className, {
    [styles.color]: color,
  });

  const TagName = as;
  return (
    <TagName onClick={onClick} className={classes}>
      {label}
    </TagName>
  );
};

export default Chip;
