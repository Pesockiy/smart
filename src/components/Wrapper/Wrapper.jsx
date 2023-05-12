import { useRef } from 'react';
import cx from 'class-names';

import Container from '@/common/Container/Container';
import Line from '@/common/Line/Line';
import Animation from '@/common/Animations/Animations';

import styles from './Wrapper.module.sass';

const Wrapper = ({
  wrapper = false,
  scrollText = true,
  topText = 'Scroll',
  count = '02',
  children = null,
  className = '',
  subtitle = '',
}) => {
  const classes = cx(styles.wrapper, className, {
    [styles.wrapperInner]: wrapper,
  });
  const itemsRefs = useRef([]);

  const pushAnimateRef = (item) => itemsRefs.current.push(item);

  return (
    <Container className={classes}>
      {wrapper && topText && (
        <Animation duration={0.5} startY={50} targets={itemsRefs.current}>
          <>
            <div className={styles.wrapperSideBlock}>
              <div ref={pushAnimateRef}>/{count}</div>
              {scrollText && (
                <div className={styles.wrapperSideText}>
                  {topText} <Line inline className={styles.wrapperSideLine} />
                </div>
              )}
            </div>
            {wrapper && (
              <Container className={styles.wrapperTopBlock}>
                <div ref={pushAnimateRef}>{`/ ${subtitle}`}</div>
              </Container>
            )}
          </>
        </Animation>
      )}
      <div className={styles.wrapperContent}>{children}</div>
    </Container>
  );
};
export default Wrapper;
