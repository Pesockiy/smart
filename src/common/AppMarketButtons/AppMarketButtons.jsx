import { forwardRef } from 'react';
import cx from 'class-names';

import Img from '@/common/Img/Img';

import styles from './AppMarketButtons.module.sass';

export const mobileButtons = [
  {
    src: '/images/appstore.png',
    label: 'appstore',
    href: '#',
  },
  {
    src: '/images/googleplay.png',
    label: 'googleplay',
    href: '#',
  },
];

const AppMarketButtons = forwardRef(({ className, buttons = mobileButtons }, ref) => {
  return (
    <>
      {buttons?.map(({ href, src, label }) => (
        <a href={href} className={cx(styles.buttons, className)}>
          <Img key={src} src={src} alt={label} width="162" height="48" />
        </a>
      ))}
    </>
  );
});

export default AppMarketButtons;
