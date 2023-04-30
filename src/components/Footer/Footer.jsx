import React from "react";
import cx from "class-names";

import styles from "./Footer.module.sass";

const Footer = ({ className, children }) => {
  return <footer className={cx(styles.footer, className)}>{children}Footer</footer>;
};

export default Footer;
