import Link from 'next/link';

import Container from '@/common/Container/Container';
import Layout from '@/components/Layout/Layout';
import IconLogo from '@/assets/icons/logo.svg';
import Stepper from '@/components/Stepper/Stepper';
import ChooseLocation from '@/components/ChooseLocation/ChooseLocation';
import styles from './BookFreeWorkout.module.sass';
import BookFreeWorkoutProvider, {
  useBookFreeWorkoutContext,
} from '@/context/BookFreeWorkoutContext';
import SelectTime from '@/components/SelectTime/SelectTime';
import ContactInfo from '@/components/ContactInfo/ContactInfo';
import VerificationAndBook from '@/components/Verification/VerificationAndBook';
import FreeWorkoutThankYou from '@/components/FreeWorkoutThankYou/FreeWorkoutThankYou';

const BookFreeWorkout = () => {
  return (
    <BookFreeWorkoutProvider>
      <header className={styles.header}>
        <Container className={styles.headerInner}>
          <Link href="/">
            <IconLogo className={styles.headerLogo} />
          </Link>
          <StepperView />
        </Container>
      </header>

      <div className={styles.container}>
        <FormItems />
      </div>
    </BookFreeWorkoutProvider>
  );
};

const FormItems = () => {
  const context = useBookFreeWorkoutContext();

  const isFirstStep = context.activeStep === 1;
  const isSecondStep = context.activeStep === 2;
  const isThirdStep = context.activeStep === 3;
  const isFourthStep = context.activeStep === 4;
  const isThankYouStep = context.activeStep === 5;

  return (
    <>
      {isFirstStep && <ChooseLocation />}
      {isSecondStep && <ContactInfo />}
      {isThirdStep && <SelectTime />}
      {isFourthStep && <VerificationAndBook />}
      {isThankYouStep && <FreeWorkoutThankYou />}
    </>
  );
};

const StepperView = () => {
  const context = useBookFreeWorkoutContext();
  return <Stepper steps={context.steps} activeStep={context.activeIdx} />;
};

BookFreeWorkout.getLayout = (page) => {
  return (
    <Layout hasFooter={false} hasHeader={false}>
      {page}
    </Layout>
  );
};

export default BookFreeWorkout;
