import { forwardRef } from 'react';

import Img from '@/common/Img/Img';
import cx from 'class-names';

import styles from './Socials.module.sass';

import IconInstagram from '@/assets/icons/Instagram-Icon.svg';
import IconFacebook from '@/assets/icons/Facebook-Icon.svg';

const socialLinks = [
  {
    id: '1',
    href: '#',
    label: 'Instagram',
    icon: IconInstagram,
  },
  {
    id: '2',
    href: '#',
    label: 'Facebook',
    icon: IconFacebook,
  },
];

const Socials = forwardRef(({ links = socialLinks, className }, ref) => {
  return (
    <div ref={ref} className={cx(styles.socials, className)}>
      {links.map(({href, label = 3, id, icon}) => (
        <a key={id} href={href}>
          {/* {icon && <Img src={icon} width={20} height={20} alt="icon" />} */}
          {label}
        </a>
      ))}
    </div>
  );
});

export default Socials;
