import React, { forwardRef } from 'react';

import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import Line from '@/common/Line/Line';
import Card from '@/common/Card/Card';
import IconFacebook from '@/assets/icons/Facebook-Icon.svg';

import styles from './Trainers.module.sass';

const TrainerCard = forwardRef(({ trainerData }, ref) => {
  const { title, text, img } = trainerData;

  return (
    <Card ref={ref} className={styles.trainerCard} img={img}>
      <div className={styles.trainerCardBody}>
        <Heading  as="h5" size="xs" className={styles.trainerCardTitle}>
          {title}
        </Heading>
        <div className={styles.trainerCardContact}>
          <Line className={styles.trainerCardLine} width="100%" />
          <IconFacebook />
        </div>
        <Text className={styles.trainerCardText}>{text}</Text>
      </div>
    </Card>
  );
});

export default TrainerCard;
