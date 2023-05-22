import { forwardRef } from 'react';
import cx from 'class-names';

import Avatar from '@/common/Avatar/Avatar';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';

import styles from './UserInfo.module.sass';

const UserInfo = forwardRef(
  (
    {
      classNames,
      children,
      data = { texts: { title: '', text: '', size, as }, img: { src: '', alt: '', size, variant } },
    },
    ref
  ) => {
    const { texts, img } = data;
    const { title, as } = texts;
    const { src, alt, size, variant } = img;

    return (
      <div ref={ref} className={cx(styles.userInfo, classNames?.className)}>
        {src && alt && (
          <Avatar
            src={src}
            alt={alt}
            variant={variant}
            size={size}
            className={cx(styles.userInfoAvatar, classNames?.avatarClassName)}
          />
        )}
        <div>
          {title && (
            <Heading size={texts.size} as={as} className={classNames?.titleClassName}>
              {texts.title}
            </Heading>
          )}
          {children}
        </div>
      </div>
    );
  }
);

export default UserInfo;
