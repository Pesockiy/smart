import React, { forwardRef, useRef } from 'react';

import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Animation from '@/common/Animations/Animations';
import Alert from '@/common/Alert/Alert';

import IconAlert from '@/assets/icons/alert.svg';
import IconPlus from '@/assets/icons/plus.svg';
import IconTriangle from '@/assets/icons/tr-1.svg';

import styles from './ScienceBased.module.sass';

const ScienceBased = forwardRef(({}, ref) => {
  const itemsRefs = useRef([]);

  const pushAnimateRef = (item) => itemsRefs.current.push(item);

  return (
    <SectionContainer
      ref={ref}
      wrapper
      count="01"
      scrollText
      subtitle={'About'}
      className={styles.scienceBased}
    >
      <div className={styles.scienceTextWrap}>
        <Heading ref={pushAnimateRef} size="xl" as="h2" className={styles.scienceTitle}>
          <Text as="span" gradient className={styles.scienceAccentTitle}>
            Science-Based
          </Text>{' '}
          Fitness
        </Heading>
        <Animation duration={0.4} startY={50} stagger={0.1} targets={itemsRefs.current}>
          <div className={styles.scienceTextsBottom}>
            <Text ref={pushAnimateRef}>
              It combines exercise robotics and Artificial Intelligence for a perfect, personalized
              training session. No plateaus. Just progress.
            </Text>
            <Text ref={pushAnimateRef}>
              It only takes one 20-minute session on each device per week. Get outstanding results
              in just one hour a week.
            </Text>
          </div>
        </Animation>
      </div>
      <Alert isVisible className={styles.alert}>
        <div className={styles.alertInner}>
          <Heading as="h5" size="xs" className={styles.alertTitle}>
            Welcome to The Smart Fit Method!
          </Heading>
          <IconAlert className={styles.alertIcon} />
          <Text className={styles.alertText}>
            You feel drowsy, have no energy, want to tone up, start your workout with a body scan!
          </Text>
        </div>
      </Alert>
      <IconPlus className={styles.iconPlus1} />
      <IconPlus className={styles.iconPlus2} />
      <IconPlus className={styles.iconPlus3} />
      <IconTriangle className={styles.iconTriangle1} />
      {/* <IconTriangle className={styles.iconTriangle2} /> */}
    </SectionContainer>
  );
});

export default ScienceBased;
