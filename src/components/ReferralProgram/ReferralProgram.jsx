import { useRef, forwardRef } from 'react';
import cx from 'class-names';

import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import Button from '@/common/Button/Button';
import GradientWrapper from '@/common/GradientWrapper/GradientWrapper';
import Animation from '@/common/Animations/Animations';
import Alert from '@/common/Alert/Alert';
import Chip from '@/common/Chip/Chip';
import Img from '@/common/Img/Img';

import styles from './ReferralProgram.module.sass';

const ReferralProgram = forwardRef(({}, ref) => {
  return (
    <SectionContainer
      ref={ref}
      className={styles.referralProgram}
      count="05"
      subtitle={'Referral program'}
    >
      <Animation duration={0.4} startY={50} stagger={0.1}>
        <GradientWrapper className={styles.referralProgramWrapper}>
          <div className={styles.referralFromTextWrap}>
            <Heading size="xl" as="h2" className={styles.referralProgramTitle}>
              Friends Day
            </Heading>
            <Text className={styles.referralProgramText}>
              Invite your friends. Get 50 $ for the next month of training.
            </Text>

            <Button variant="primary" className={cx(styles.referralProgramButton, styles.desktop)}>
              Invite friends
            </Button>
          </div>
          <div className={styles.referralProgramImgWrapper}>
            <Alert isVisible className={styles.referralProgramAlert}>
              You have
              <Chip className={styles.referralProgramChip} label="+ 2 referral friends" />
            </Alert>
            <Alert isVisible className={cx(styles.referralProgramAlert, styles.accent)}>
              Your friend has been accepted! Congratulations!
              <Chip className={styles.referralProgramChip} label="Milly Bobby Brown" />
            </Alert>
            <Alert isVisible className={styles.referralProgramAlert}>
              Has completed a free lesson! Get your reward of 50 $
              <Chip className={styles.referralProgramChip} label="Jake Dan" />
            </Alert>
            <Img
              src={'/images/referral-program/referral-program.jpg'}
              alt="referral program"
              width="618"
              height="486"
            />
          </div>
        </GradientWrapper>
        <Button variant="primary" className={cx(styles.referralProgramButton, styles.mobile)}>
          Invite friends
        </Button>
      </Animation>
    </SectionContainer>
  );
});

export default ReferralProgram;
