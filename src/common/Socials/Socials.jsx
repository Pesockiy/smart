import { forwardRef } from 'react';
import cx from 'class-names';

import Img from '@/common/Img/Img';

import IconInstagram from '@/assets/icons/Instagram-Icon.svg';
import IconFacebook from '@/assets/icons/Facebook-Icon.svg';

import styles from './Socials.module.sass';

const socialLinks = [
  {
    id: '1',
    href: '#',
    label: 'Instagram',
    src: '/images/inst.png',
  },
  {
    id: '2',
    href: '#',
    label: 'Facebook',
    src: '/images/facebook.png',
  },
];

const Socials = forwardRef(({ links = socialLinks, className }, ref) => {
  return (
    <div ref={ref} className={cx(styles.socials, className)}>
      {links.map(({ href, label = 3, id, src }) => (
        <a key={id} href={href}>
          <Img className={styles.icon} src={src} width={24} height={24} alt="icon" />
          {label}
        </a>
      ))}
    </div>
  );
});

export default Socials;
