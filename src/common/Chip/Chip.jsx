import React from "react";
import cx from "class-names";

import styles from "./Chip.module.sass";

const Chip = ({
  size,
  type,
  label,
  color,
  variant,
  className,
  as = "span",
  onClick = () => {},
}) => {
  const classes = cx(styles[variant], styles.chip, className, {
    [styles.color]: color,
    // [styles.disabled]: disabled,
    // [styles.outlined]: outlined,
  });

  const TagName = as;
  return (
    <TagName onClick={onClick} className={classes}>
      {label}
    </TagName>
  );
};

export default Chip;
