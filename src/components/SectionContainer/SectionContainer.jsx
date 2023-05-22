import { forwardRef } from 'react';
import cx from 'class-names';

import Container from '@/common/Container/Container';
import Wrapper from '@/components/Wrapper/Wrapper';

import styles from './SectionContainer.module.sass';

const SectionContainer = forwardRef(
  (
    {
      children,
      count,
      containerClassName,
      subtitle,
      className,
      scrollText,
      wrapper,
      rtl,
      verticalCenter,
    },
    ref
  ) => {
    return (
      <section ref={ref} className={className}>
        <Wrapper
          wrapper={wrapper}
          className={cx(styles.sectionContainerWrap, className)}
          count={count}
          subtitle={subtitle}
          scrollText={scrollText}
        >
          <Container
            disableGutters={wrapper}
            className={cx(styles.sectionContainerTop, containerClassName)}
            style={{
              flexDirection: rtl ? 'row-reverse' : 'row',
              alignItems: verticalCenter ? 'center' : 'flex-start',
            }}
          >
            {children}
          </Container>
        </Wrapper>
      </section>
    );
  }
);

export default SectionContainer;
