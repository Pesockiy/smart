import React, { memo, forwardRef } from 'react';
import Link from 'next/link';

import styles from './NavItem.module.sass';

const NavItem = forwardRef(({ className, navItem }, ref) => {
  return (
    <li ref={ref} className={className}>
      <Link className={styles.navLink} href={navItem.path}>
        {navItem.name}
      </Link>
    </li>
  );
});

export default memo(NavItem);
