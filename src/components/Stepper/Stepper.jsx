import { useWindowDimensions } from '@/hooks';
import cx from 'class-names';

import styles from './Stepper.module.sass';

export const STATUS = {
  active: 'active',
  default: 'default',
  completed: 'completed',
};

const Stepper = ({ steps, activeStep }) => {
  const size = useWindowDimensions();

  const moveStyles = {
    transform: size.width <= 950 ? `translateX(calc(50% - ${activeStep * 260 + 'px'}))` : 'none',
  };

  return (
    <ul className={styles.stepList} style={moveStyles}>
      {steps.map((step, idx) => {
        const stepNumber = idx + 1;
        const isCompleted = step.status === STATUS.completed;
        const isCurrent = idx === activeStep;

        const stepContent = isCompleted && activeStep > idx ? <CheckMark /> : stepNumber;

        const stepListItemClasses = cx(styles.stepListItem, {
          [styles.completed]: isCompleted && activeStep > idx,
          [styles.active]: activeStep >= idx,
        });

        const stepClasses = cx(styles.step, {
          [styles.completed]: isCompleted && activeStep > idx,
          [styles.active]: activeStep >= idx,
        });

        const stepTextClasses = cx(styles.stepText, {
          [styles.completed]: activeStep > idx,
          [styles.active]: isCurrent,
        });

        return (
          <li key={step.id} className={stepListItemClasses}>
            <div className={stepClasses}>{stepContent}</div>
            <p className={stepTextClasses}>{step.label}</p>
          </li>
        );
      })}
    </ul>
  );
};

const CheckMark = () => {
  return <div className={styles.checkMark}></div>;
};

export default Stepper;
