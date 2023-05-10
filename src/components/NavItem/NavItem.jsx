import React, { memo } from "react";
import Link from "next/link";

import styles from "./NavItem.module.sass";

const NavItem = ({ className, navItem }) => {
  return (
    <li className={className}>
      <Link className={styles.navLink} href={navItem.path}>
        {navItem.name}
      </Link>
    </li>
  );
};

export default memo(NavItem);
