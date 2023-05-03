import StepView from '../common/StepsView';
import styles from '../Pagination.module.sass';

const StepsList = ({ steps, currentPage, onPageChange }) => {
  return (
    <ul className={styles.stepsList}>
      {steps.map((step, idx) => (
        <StepView
          key={idx}
          step={step}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}
    </ul>
  );
};

export default StepsList;
