import { useRouter } from 'next/router';
import cx from 'class-names';

import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import YourAppointmentDetails from '../YourAppointmentDetails/YourAppointmentDetails';
import styles from './FreeWorkoutThankYou.module.sass';
import Button from '@/common/Button/Button';

const FreeWorkoutThankYou = ({ className = '' }) => {
  const router = useRouter();

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.left}>
        <Heading as="h1" className={styles.title}>
          <Text gradient>Thank you!</Text>
          See you soon!
        </Heading>
        <p className={styles.description}>
          We have sent you an email with your appointment details.
        </p>
      </div>

      <Button className={styles.goHomeBtn} variant="primary" onClick={() => router.push('/')}>
        Go home
      </Button>

      <div className={styles.right}>
        <YourAppointmentDetails hasAddToCalendarBtn />
      </div>
    </div>
  );
};

export default FreeWorkoutThankYou;
