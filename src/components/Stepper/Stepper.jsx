export const STATUS = {
  active: 'active',
  default: 'default',
  completed: 'completed',
};

const Stepper = ({ steps, activeStep }) => {
  return (
    <ul className="steps-list">
      {steps.map((step, idx) => {
        const stepNumber = idx + 1;
        const isCompleted = step.status === STATUS.completed;
        const isCurrent = idx === activeStep;
        const isActive = step.status === STATUS.active;

        const stepTextClasses = isCurrent ? 'step-text active' : 'step-text';

        const stepTextC = activeStep > idx ? stepTextClasses + ' completed' : stepTextClasses;

        const stepContent = isCompleted && activeStep > idx ? <CheckMark /> : stepNumber;

        const listItemClassNames =
          isCompleted && activeStep > idx ? 'step-list-item completed' : 'step-list-item';

        const currentStepClasses = isCurrent ? 'step active' : 'step';
        const stepClasses =
          activeStep > idx ? currentStepClasses + ' completed' : currentStepClasses;

        return (
          <li key={step.id} className={listItemClassNames}>
            <div className={stepClasses}>{stepContent}</div>
            <p className={stepTextC}>{step.label}</p>
          </li>
        );
      })}
    </ul>
  );
};

const CheckMark = () => {
  return <div className="check-mark"></div>;
};

export default Stepper;
