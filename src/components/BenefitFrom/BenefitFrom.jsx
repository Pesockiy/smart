import { useRef, forwardRef } from 'react';

import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import Button from '@/common/Button/Button';
import BenefitItem from '@/components/BenefitItem/BenefitItem';
import Animation from '@/common/Animations/Animations';

import { benefitItems } from '@/mock';

import styles from './BenefitFrom.module.sass';

const BenefitFrom = forwardRef(({innerRef}, ref) => {
  const itemsRefs = useRef([]);

  const pushAnimateRef = (item) => itemsRefs.current.push(item);

  return (
    <section ref={ref} className={styles.benefitFrom}>
      <SectionContainer ref={innerRef} wrapper scrollText vCenter count="02" subtitle={'Advantages'}>
        <Animation duration={0.4} startY={50} stagger={0.1} targets={itemsRefs.current}>
          <div className={styles.benefitFromTextWrap}>
            <Heading ref={pushAnimateRef} size="xl" as="h2" className={styles.scienceTitle}>
              <Text gradient className={styles.scienceAccentTitle}>
                Benefit From
              </Text>{' '}
              Using Our Method
            </Heading>
            <div className={styles.benefitFromItems}>
              {benefitItems.map((item) => (
                <BenefitItem ref={pushAnimateRef} key={item.title} item={item} />
              ))}
            </div>
            <Button ref={pushAnimateRef} variant="primary" className={styles.benefitFromButton}>
              Book a free workout
            </Button>
          </div>
        </Animation>
      </SectionContainer>
    </section>
  );
});

export default BenefitFrom;
