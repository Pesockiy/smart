import { createContext, useContext, useState } from 'react';

const STATUS = {
  active: 'active',
  default: 'default',
  completed: 'completed',
};

const STEPS = [
  { id: 1, label: 'Location', status: STATUS.active },
  { id: 2, label: 'Contact Info', status: STATUS.default },
  { id: 3, label: 'Choose time', status: STATUS.default },
  { id: 4, label: 'Verification & book', status: STATUS.default },
];

export const BookFreeWorkoutContext = createContext(undefined);

export const useBookFreeWorkoutContext = () => {
  const context = useContext(BookFreeWorkoutContext);

  if (context === undefined) {
    throw new Error('useBookFreeWorkoutContext must be used within a BookFreeWorkoutProvider.');
  }

  return context;
};

const BookFreeWorkoutProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({
    location: null,
    contacts: null,
    time: null,
  });
  const [activeStep, setActiveStep] = useState(1);
  const [activeIdx, setActiveIdx] = useState(0);
  const [steps, setSteps] = useState(STEPS);

  const handlePrev = () => {
    if (activeStep !== 1) {
      setActiveStep(activeStep - 1);
    }

    if (activeIdx !== 0) {
      setActiveIdx(activeIdx - 1);
    }
  };

  const handleNext = () => {
    if (STEPS.length > activeStep) {
      setActiveStep(activeStep + 1);
    }

    if (STEPS.length - 1 > activeIdx) {
      setSteps((prevSteps) =>
        prevSteps.map((step, index) => {
          if (index === activeIdx) {
            return { ...step, status: STATUS.completed };
          }

          if (index === activeIdx + 1) {
            return { ...step, status: STATUS.active };
          }

          return step;
        })
      );
      setActiveIdx(activeIdx + 1);
    }
  };

  const setValues = (values) => {
    setFormValues((prev) => ({ ...prev, ...values }));
  };

  const values = {
    handleNext,
    handlePrev,
    activeIdx,
    activeStep,
    steps,
    formValues,
    setValues,
  };

  return (
    <BookFreeWorkoutContext.Provider value={values}>{children}</BookFreeWorkoutContext.Provider>
  );
};

export default BookFreeWorkoutProvider;
