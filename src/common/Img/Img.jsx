import React from "react";
import Image from "next/image";
import cx from "class-names";

import styles from "./Img.module.sass";

const Img = ({ className, ...rest }) => {
  return <Image className={cx(styles.img, className)} {...rest} />;
};

export default Img;
