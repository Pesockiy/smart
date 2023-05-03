import cx from 'class-names';

import { isItDots } from '@/helpers';
import styles from '../Pagination.module.sass';

const StepView = ({ step, currentPage, onPageChange }) => {
  const isActive = step === currentPage;

  const classes = cx(styles.stepBtn, {
    [styles.activeDot]: isActive,
  });

  if (isItDots(step)) {
    return (
      <li>
        <div className={styles.dot}>{step}</div>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        className={classes}
        onClick={() => onPageChange(+step)}
      >
        {step}
      </button>
    </li>
  );
};

export default StepView;
