import Container from '@/common/Container/Container';
import Layout from '@/components/Layout/Layout';
import IconLogo from '@/assets/icons/logo.svg';
import Stepper from '@/components/Stepper/Stepper';
import { useState } from 'react';
import Link from 'next/link';
import ContactInfo from './contact-info';
import SelectTime from './select-time';
import ChooseLocation from '@/components/ChooseLocation/ChooseLocation';
import styles from './BookFreeWorkout.module.sass';
import Button from '@/common/Button/Button';

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

const BookFreeWorkout = () => {
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

  return (
    <>
      <header className={styles.header}>
        <Container className={styles.headerInner}>
          <Link href="/">
            <IconLogo className={styles.headerLogo} />
          </Link>
          <Stepper steps={steps} activeStep={activeIdx} />
        </Container>
      </header>

      <Container className={styles.wrapper}>
        {activeStep === 1 && <ChooseLocation onNext={handleNext} />}
        {activeStep === 2 && <ContactInfo onNext={handleNext} onPrev={handlePrev} />}
        {activeStep === 3 && <SelectTime onNext={handleNext} onPrev={handlePrev} />}
        {activeStep === 4 && <Verification onNext={handleNext} onPrev={handlePrev} />}
      </Container>
    </>
  );
};

const Verification = ({ onNext, onPrev }) => {
  return (
    <div>
      <Button outlined variant="secondary" onClick={onPrev}>
        Prev
      </Button>
      <Button outlined variant="primary" onClick={onNext}>
        Next
      </Button>
    </div>
  );
};

BookFreeWorkout.getLayout = (page) => {
  return (
    <Layout hasFooter={false} hasHeader={false}>
      {page}
    </Layout>
  );
};

export default BookFreeWorkout;
