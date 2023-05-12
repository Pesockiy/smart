import { useRef } from 'react';

import Nav from '@/components/Nav/Nav';
import Heading from '@/common/Heading/Heading';
import Button from '@/common/Button/Button';
import Container from '@/common/Container/Container';
import Input from '@/common/Input/Input';
import Line from '@/common/Line/Line';
import Animation from '@/common/Animations/Animations';

import IconDots from '@/assets/icons/dots/dots-footer.svg';

import styles from './Footer.module.sass';
import Socials from '@/common/Socials/Socials';

const Footer = ({ data }) => {
  const refs = useRef([]);

  return (
    <footer className={styles.footer}>
      <Container className={styles.footerInner}>
        <IconDots className={styles.footerDotsIcon} />
        <Animation targets={refs.current}>
          <div ref={(item) => refs.current.push(item)} className={styles.footerTop}>
            <div className={styles.footerTextWrap}>
              <Heading
                // ref={(item) => refs.current.push(item)}
                as="h3"
                size="xs"
                className={styles.footerTitle}
              >
                Subscribe to get notified about special offers and company news.
              </Heading>

              <form
                // ref={(item) => refs.current.push(item)}
                action=""
                className={styles.footerForm}
              >
                <Input type="text" placeholder="Enter your email" className={styles.footerInput} />
                <Button variant="primary" className={styles.footerButton}>
                  Subscribe
                </Button>
              </form>

              <Socials ref={(item) => refs.current.push(item)} className={styles.footerSocials} />
            </div>
            <div
              //  ref={(item) => refs.current.push(item)}
              className={styles.footerNavWrap}
            >
              <Heading
                // ref={(item) => refs.current.push(item)}
                as="h3"
                size="sm"
              >
                Menu
              </Heading>
              <Nav
                // ref={(item) => refs.current.push(item)}
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
              <a href="#">Terms of Use</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Designed by: League Designed Agency</a>
            </div>
          </div>
        </Animation>
      </Container>
    </footer>
  );
};

export default Footer;
