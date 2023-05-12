import React, { forwardRef, useRef } from 'react';

import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Animation from '@/common/Animations/Animations';

import styles from './ScienceBased.module.sass';

const ScienceBased = forwardRef(({}, ref) => {
  const itemsRefs = useRef([]);

  const pushAnimateRef = (item) => itemsRefs.current.push(item);

  return (
    <section ref={ref} className={styles.scienceBased}>
      <SectionContainer wrapper vCenter count="01" subtitle={'About'}>
        <Animation duration={0.4} startY={50} stagger={0.1} targets={itemsRefs.current}>
          <div className={styles.scienceTextWrap}>
            <Heading ref={pushAnimateRef} size="xl" as="h2" className={styles.scienceTitle}>
              <Text as="span" gradient className={styles.scienceAccentTitle}>
                Science-Based
              </Text>{' '}
              Fitness
            </Heading>
            <div className={styles.scienceTextsBottom}>
              <Text ref={pushAnimateRef}>
                It combines exercise robotics and Artificial Intelligence for a perfect,
                personalized training session. No plateaus. Just progress.
              </Text>
              <Text ref={pushAnimateRef}>
                It only takes one 20-minute session on each device per week. Get outstanding results
                in just one hour a week.
              </Text>
            </div>
          </div>
        </Animation>
      </SectionContainer>
    </section>
  );
});

export default ScienceBased;
