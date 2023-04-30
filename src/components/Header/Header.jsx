import Link from "next/link";
import Image from "next/image";
import cx from "class-names";

import { useOffsetTop } from "@/hooks";

import {
  header,
  headerNav,
  headerInner,
  headerLeft,
  headerRight,
  headerButton,
  headerLangButton,
  headerScroled,
  arrow,
} from "./Header.module.sass";

import Nav from "@/components/Nav/Nav";
import Button from "@/common/Button/Button";
import Container from "@/common/Container/Container";

import Logo from "@/assets/icons/logo.svg";
import Arrow from "@/assets/icons/arrow.svg";

const Header = ({ openMenuHandler }) => {
  const [isScroled] = useOffsetTop(0);

  const headerClasses = cx(header, {
    [headerScroled]: isScroled,
  });

  return (
    <header className={headerClasses}>
      <Container className={headerInner}>
        <div className={headerLeft}>
          <Link href="/">
            <Logo />
          </Link>

          <Button
            ooutlined
            variant="secondary"
            className={headerLangButton}
            onClick={openMenuHandler}
          >
            City
            <Arrow />
          </Button>
        </div>
        <div className={headerRight}>
          <Nav className={headerNav} />

          <Button outlined variant="primary" className={headerButton}>
            Book a free
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
