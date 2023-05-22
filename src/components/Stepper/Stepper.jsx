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

  const stepNumber = steps.length === activeStep ? steps.length - 1 : activeStep;

  const moveStyles = {
    transform: size.width <= 950 ? `translateX(calc(50% - ${stepNumber * 260 + 'px'}))` : 'none',
  };

  return (
    <ul className={styles.stepList} style={moveStyles}>
      {steps.map((step, idx) => {
        const stepNumber = idx + 1;
        const isCompleted = step.status === STATUS.completed;
        const isCurrent = idx === activeStep;

        const stepContent =
          isCompleted && activeStep > idx ? (
            <CheckMarkIcon className={styles.checkMark} />
          ) : (
            stepNumber
          );

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

const CheckMarkIcon = () => {
  return (
    <svg
      className={styles.checkMark}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130.2 130.2"
    >
      <polyline
        fill="none"
        stroke="#fff"
        strokeWidth="14"
        strokeLinecap="round"
        strokeMiterlimit="10"
        points="100.2,40.2 51.5,88.8 29.8,67.5"
      />
    </svg>
  );
};

export default Stepper;
