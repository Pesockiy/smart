import React from "react";
import cx from "class-names";

import styles from "./Nav.module.sass";

import { useMedia } from "@/hooks";

import NavItem from "@/components/NavItem/NavItem";

import { navLinks } from "@/utilits/variables";

const { nav, navList } = styles;

const Nav = ({ className }) => {
  const { isDesktop } = useMedia();

  return (
    <>
      <nav className={nav}>
        <ul className={cx(navList, className)}>
          {navLinks.map((navItem) => (
            <NavItem key={navItem.name} navItem={navItem} />
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
