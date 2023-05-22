import { useRef, useState, useEffect, useCallback } from 'react';
import cx from 'class-names';

import { useToggle, useLocalStorage, useMedia } from '@/hooks';

import Nav from '@/components/Nav/Nav';
import Heading from '@/common/Heading/Heading';
import Button from '@/common/Button/Button';
import Container from '@/common/Container/Container';
import Input from '@/common/Input/Input';
import Line from '@/common/Line/Line';
import Animation from '@/common/Animations/Animations';
import Socials from '@/common/Socials/Socials';
import AppMarketButtons from '@/common/AppMarketButtons/AppMarketButtons';
import Alert from '@/common/Alert/Alert';

import IconSuccess from '@/assets/icons/check.svg';

import IconDots from '@/assets/icons/dots/dots-footer.svg';

import styles from './Footer.module.sass';

const links = [
  {
    href: '#',
    label: 'Terms of Use',
  },
  {
    href: '#',
    label: 'Privacy Policy',
  },
  {
    href: '#',
    label: 'Designed by: League Designed Agency',
  },
];

const alertDelay = 2000;

const Footer = ({ data }) => {
  const refs = useRef([]);
  const { isTablet } = useMedia();
  const [alertBook, setAlertBook] = useState(false);
  const [isAlertBookSetted, setIsAlertBookSetted] = useLocalStorage('alertBook', false);

  useEffect(() => {
    const timer = setTimeout(() => {
      !isAlertBookSetted && setAlertBook(true);
    }, alertDelay);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const alertCloseHandler = useCallback(() => {
    setAlertBook(false);
    setIsAlertBookSetted(true);
  }, [alertBook]);

  return (
    <footer className={styles.footer}>
      <Container className={styles.footerInner}>
        <IconDots className={styles.footerDotsIcon} />
        <Animation targets={refs.current}>
          <div ref={(item) => refs.current.push(item)} className={styles.footerTop}>
            <div className={styles.footerMobileTop}>
              <Heading as="h5" size="xs" className={styles.footerTitle}>
                Smart Fit Method App
              </Heading>
              <AppMarketButtons />
            </div>
            <div className={styles.footerTextWrap}>
              <Heading as="h3" size="xs" className={cx(styles.footerTitle, styles.footerTitle1)}>
                Subscribe to get notified about special offers and company news.
              </Heading>

              <div className={styles.footerForm}>
                <Input type="text" placeholder="Enter your email" className={styles.footerInput} />
                <Button variant="primary" className={styles.footerButton}>
                  Subscribe
                </Button>
              </div>

              <Socials ref={(item) => refs.current.push(item)} className={styles.footerSocials} />
            </div>
            <div className={styles.footerNavWrap}>
              <Heading as="h3" size="sm" className={styles.footerTitle2}>
                Menu
              </Heading>
              <Nav
                classNames={{
                  navClassName: styles.footerNav,
                  navListClassName: styles.footerNavList,
                }}
              />
              <address ref={(item) => refs.current.push(item)} className={styles.footerAddress}>
                <a href="mailto:hello@smartfitmethod.com">hello@smartfitmethod.com</a>
              </address>
            </div>
          </div>
          <Line
            ref={(item) => refs.current.push(item)}
            width="100%"
            className={styles.footerBottomLine}
          />
          <div ref={(item) => refs.current.push(item)} className={styles.footerBottom}>
            <div className={styles.footerCopyRightWrap}>&#169; Smart Fit Method 2023</div>
            <div className={styles.footerBottomLinksWrap}>
              {links?.map(({ href, label }) => (
                <a href={href}>{label}</a>
              ))}
            </div>
          </div>
        </Animation>
      </Container>
      <Alert
        closeButton
        isLayer={isTablet}
        isVisible={alertBook}
        className={styles.alert}
        iconClassName={styles.alertIconClassName}
        onClose={alertCloseHandler}
      >
        <div className={styles.alertInner}>
          <IconSuccess className={styles.alertIconSuccess} />
          <Heading as="h5" size="xs" className={styles.alertTitle}>
            Hello! Our new <span>La Jolla</span> location is now open! Click to book a Free Workout!
          </Heading>
        </div>
        <Button variant="primary" outlined className={styles.aleftButton}>
          Free book a La Jolla{' '}
        </Button>
      </Alert>
    </footer>
  );
};

export default Footer;
