import { forwardRef } from 'react';
import cx from 'class-names';

import Container from '@/common/Container/Container';

import styles from './Overlay.module.sass';

const Overlay = forwardRef(({ className, children }, ref) => {
  return (
    <Container ref={ref} className={cx(styles.overlay, className)}>
      {children}
    </Container>
  );
});

export default Overlay;
