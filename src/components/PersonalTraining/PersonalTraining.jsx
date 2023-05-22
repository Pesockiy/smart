import { forwardRef } from 'react';
import cx from 'class-names';

import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import Button from '@/common/Button/Button';
import Img from '@/common/Img/Img';

import styles from './PersonalTraining.module.sass';

const PersonalTraining = forwardRef(({}, ref) => {
  return (
    <SectionContainer wrapper ref={ref} containerClassName={styles.personalTraining}>
      <div className={styles.personalTrainingContent}>
        <div className={styles.personalTrainingBody}>
          <Img
            src="/images/body.png"
            alt="Sdfdf"
            width="900"
            height="600"
            className={styles.personalTrainingImg}
          />
        </div>
        <div className={styles.personalTrainingTexts}>
          <Heading as="h2" size="xl">
            Personal Training
            <Text as="span" gradient className={styles.personalTrainingButtonText}>
              For 20 Minutes
            </Text>
            Three Times a Week
          </Heading>
          <Button
            className={cx(styles.personalTrainingButton, styles.btnDesktop)}
            variant="primary"
          >
            Start a free training
          </Button>
        </div>
        <Button className={cx(styles.personalTrainingButton, styles.btnMobile)} variant="primary">
          Start a free training
        </Button>
      </div>
    </SectionContainer>
  );
});

export default PersonalTraining;
