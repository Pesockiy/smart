import React, { useEffect } from "react";
import cx from "class-names";

import styles from "./Nav.module.sass";

import { useMedia } from "@/hooks";
import { useToggle } from "@/hooks";

import { navLinks } from "@/utilits/variables";

import NavItem from "@/components/NavItem/NavItem";

import IconMenuOpen from "@/assets/icons/menu-open.svg";
import IconMenuClose from "@/assets/icons/menu-close.svg";

const { nav, navList } = styles;

const Nav = ({ className }) => {
  const { isMobile } = useMedia();
  const [showMobileMenu, setShowMobileMenu] = useToggle(false);
  const [isMenuOpen, setIsMenuOpen] = useToggle(false);

  useEffect(() => {
    setShowMobileMenu(isMobile);
  }, [isMobile]);

  const menuToggleHandler = () => setIsMenuOpen();

  return (
    <>
      {isMobile && showMobileMenu && (
        <button onClick={menuToggleHandler}>
          {isMenuOpen ? <IconMenuClose /> : <IconMenuOpen />}
        </button>
      )}
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
