import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cx from 'class-names';

import { useOffsetTop, useToggle, useMedia } from '@/hooks';

import Nav from '@/components/Nav/Nav';
import Button from '@/common/Button/Button';
import Container from '@/common/Container/Container';
import SelectLocationButton from '@/components/SelectLocationButton/SelectLocationButton';
import Animation from '@/common/Animations/Animations';
import Alert from '@/common/Alert/Alert';
import Text from '@/common/Text/Text';

import IconMenuOpen from '@/assets/icons/menu-open.svg';
import IconMenuClose from '@/assets/icons/menu-close.svg';
import IconLogo from '@/assets/icons/logo.svg';

import styles from './Header.module.sass';

const Header = () => {
  const [isScroled] = useOffsetTop(0);
  const [isMenuOpen, setIsMenuOpen] = useToggle(false);
  const [isLocationOpen, setIsLocationOpen] = useToggle(false);
  const { isTablet } = useMedia();
  const router = useRouter();
  const animationRefs = useRef([]);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [router.pathname]);

  const menuToggleHandler = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const locationToggleHandler = useCallback(() => {
    setIsLocationOpen((prev) => !prev);
  }, [isLocationOpen]);

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

  const pushAnimateRef = (item) => animationRefs.current.push(item);

  return (
    <header className={headerClasses}>
      <Animation
        targets={animationRefs.current}
        toggleActions={'none'}
        startY={'-=100'}
        duration={0.4}
      >
        <Container className={styles.headerInner}>
          <Link ref={pushAnimateRef} href="/">
            <IconLogo className={styles.headerLogo} />
          </Link>

          <div className={headerNavWrapClasses}>
            <SelectLocationButton
              openMenuHandler={locationToggleHandler}
              ref={pushAnimateRef}
              className={styles.headerSelectLocation}
            />
            <Nav ref={pushAnimateRef} classNames={headerNavClasses} />

            <Button
              ref={pushAnimateRef}
              outlined
              variant="primary"
              className={styles.headerButton}
              onClick={() => router.push('/book-free-workout')}
            >
              Book a free
            </Button>
          </div>
          <button
            ref={pushAnimateRef}
            className={styles.headerMenuButton}
            onClick={menuToggleHandler}
          >
            {isMenuOpen ? <IconMenuClose /> : <IconMenuOpen />}
          </button>
          <Alert
            isLayer={isTablet}
            isVisible={isLocationOpen}
            onClose={locationToggleHandler}
            closeButton
            className={styles.headerAlert}
          >
            <Text className={styles.headerAlertText}>
              Are you located in <span>Cardiff?</span>
            </Text>
            <Button
              variant="primary"
              onClick={locationToggleHandler}
              className={styles.headerAlertBtn}
            >
              Yes
            </Button>
            <button onClick={locationToggleHandler} className={styles.headerAlertChangeBtn}>
              Change
            </button>
          </Alert>
        </Container>
      </Animation>
    </header>
  );
};

export default Header;
