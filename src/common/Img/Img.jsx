import {forwardRef} from "react";
import Image from "next/image";
import cx from "class-names";

import styles from "./Img.module.sass";

const Img = forwardRef(({ className, ...rest }, ref) => {
  return <Image ref={ref} className={cx(styles.img, className)} {...rest} />;
});

export default Img;
