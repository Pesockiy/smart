import React from "react";
import Link from "next/link";

import styles from "./NavItem.module.sass";

export default function NavItem({ navItem }) {
  return (
    <li className={styles.navItem}>
      <Link className={styles.navLink} href={navItem.path}>
        {navItem.name}
      </Link>
    </li>
  );
}
