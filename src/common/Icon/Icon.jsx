import React from "react";
import cx from "class-names";

import sprite from "@/assets/icons/_sprite.svg";

export const Icon = ({
  className = "",
  icon = "",
  size,
  color = "#000000",
}) => {
  const href = `${sprite}#${icon}`;
  const style = {
    fontSize: size + "px",
    color,
  };
  const classes = cx(`icon icon-${icon}`, className);

  return (
    <svg style={style} className={classes}>
      <use xlinkHref={href}></use>
    </svg>
  );
};
