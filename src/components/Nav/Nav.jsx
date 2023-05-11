import React, { memo } from "react";
import cx from "class-names";

import styles from "./Nav.module.sass";

import NavItem from "@/components/NavItem/NavItem";

import { navLinks } from "@/utilits/variables";

const { nav, navList } = styles;

const Nav = ({ classNames }) => {
  return (
    <nav className={cx(nav, classNames.navClassName)}>
      <ul className={cx(navList, classNames.navListClassName)}>
        {navLinks.map((navItem) => (
          <NavItem
            key={navItem.name}
            navItem={navItem}
            className={classNames.navItemClassName}
          />
        ))}
      </ul>
    </nav>
  );
};

export default memo(Nav);
