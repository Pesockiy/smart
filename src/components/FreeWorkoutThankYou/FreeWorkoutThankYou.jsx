import { useRouter } from 'next/router';

import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import YourAppointmentDetails from '../YourAppointmentDetails/YourAppointmentDetails';
import styles from './FreeWorkoutThankYou.module.sass';
import Button from '@/common/Button/Button';

const FreeWorkoutThankYou = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Heading>
          <Text gradient>Thank you!</Text>
          See you soon!
        </Heading>
        <p>We have sent you an email with your appointment details.</p>
        <Button variant="primary" onClick={() => router.push('/')}>
          Go home
        </Button>
      </div>

      <div className={styles.right}>
        <YourAppointmentDetails />
      </div>
    </div>
  );
};

export default FreeWorkoutThankYou;
