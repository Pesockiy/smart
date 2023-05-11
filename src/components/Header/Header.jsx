import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cx from "class-names";

import { useOffsetTop, useToggle } from "@/hooks";

import Nav from "@/components/Nav/Nav";
import Button from "@/common/Button/Button";
import Container from "@/common/Container/Container";
import SelectLocationButton from "@/components/SelectLocationButton/SelectLocationButton";

import IconMenuOpen from "@/assets/icons/menu-open.svg";
import IconMenuClose from "@/assets/icons/menu-close.svg";
import IconLogo from "@/assets/icons/logo.svg";

import styles from "./Header.module.sass";

const Header = () => {
  const [isScroled] = useOffsetTop(0);
  const [isMenuOpen, setIsMenuOpen] = useToggle(false);
  const router = useRouter();

  const menuToggler = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [router.pathname]);

  const headerClasses = cx(styles.header, {
    [styles.isHeaderScroled]: isScroled,
  });

  const headerNavClasses = {
    navListClassName: styles.headerNav,
    navItemClassName: styles.headerNavItem,
  };

  const headerNavWrapClasses = cx(styles.headerNavWrap, {
    [styles.isOpen]: isMenuOpen,
  });

  return (
    <header className={headerClasses}>
      <Container className={styles.headerInner}>
        <Link href="/">
          <IconLogo className={styles.headerLogo} />
        </Link>

        <div className={headerNavWrapClasses}>
          <SelectLocationButton className={styles.headerSelectLocation} />
          <Nav classNames={headerNavClasses} />

          <Button outlined variant="primary" className={styles.headerButton}>
            Book a free
          </Button>
        </div>
        <button className={styles.headerMenuButton} onClick={menuToggler}>
          {isMenuOpen ? <IconMenuClose /> : <IconMenuOpen />}
        </button>
      </Container>
    </header>
  );
};

export default Header;
