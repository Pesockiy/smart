import React, { forwardRef } from 'react';
import cx from 'class-names';

import Img from '@/common/Img/Img';

import styles from './Card.module.sass';

const Card = forwardRef(
  (
    {
      className,
      children,
      img ,
      bodyClassName,
    },
    ref
  ) => {

    return (
      <div ref={ref} className={cx(styles.card, className)}>
        {img && (
          <div className={cx(styles.cardHeader, img?.imgClassName)}>
            <Img
              src={img?.src}
              alt={img?.alt}
              width={img?.width}
              height={img?.height}
              className={cx(styles.img)}
              {...img?.rest}
            />
          </div>
        )}
        <div className={cx(styles.trainerCardBody, bodyClassName)}>{children}</div>
      </div>
    );
  }
);

export default Card;
