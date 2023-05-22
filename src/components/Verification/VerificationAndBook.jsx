import { useEffect, useState } from 'react';

import Button from '@/common/Button/Button';
import { useBookFreeWorkoutContext } from '@/context/BookFreeWorkoutContext';
import styles from './VerificationAndBook.module.sass';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import PhoneInput from '../PhoneInput/PhoneInput';
import EditIcon from '@/assets/icons/edit.svg';
import YourAppointmentDetails from '../YourAppointmentDetails/YourAppointmentDetails';
import VerifyCodeInputs from '../VerifyCodeInputs/VerifyCodeInputs';
import { useTimer } from '@/hooks';

const VerificationAndBook = () => {
  const { seconds, onStart } = useTimer({ seconds: 45 });
  const context = useBookFreeWorkoutContext();
  const [isPhoneInput, setIsPhoneInput] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const { contacts, location } = context.formValues;

  // NOTE: simulate verification;
  useEffect(() => {
    if (seconds < 40) {
      context.onLastStepComplete();
    }
  }, [seconds]);

  const handleSaveNumber = () => {
    setIsPhoneInput(false);
    setIsValidating(false);
  };

  const onChangeNumber = (evt) => {
    context.setValues({ contacts: { ...context.formValues.contacts, phone: evt.target.value } });
  };

  const handleValidate = () => {
    setIsValidating(true);
    onStart();
  };

  const handleResend = () => {
    onStart();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Heading className={styles.title}>
          <Text gradient>Verification & Book</Text>
        </Heading>

        <div>
          <div className={styles.verifyNumber}>
            Please verify the 6 digit code sent to your mobile {contacts.phone}{' '}
            <button type="button" onClick={() => setIsPhoneInput(!isPhoneInput)}>
              <EditIcon />
            </button>
          </div>
        </div>

        <div className={styles.inputWrapper}>
          {isPhoneInput && (
            <div className={styles.phoneInput}>
              <PhoneInput value={contacts.phone} onChange={onChangeNumber} />
              <button type="button" className={styles.saveBtn} onClick={handleSaveNumber}>
                Save
              </button>
            </div>
          )}
          {!isPhoneInput && <VerifyCodeInputs />}
        </div>

        <div className={styles.verifyInfo}>
          <p>Did not receive the code? Please verify that your number is correct.</p>
          <p>
            If you have any questions please don’t hesitate to text/call us at {location.phone} or
            via email {location.email}
          </p>
        </div>

        {!isValidating && (
          <Button className={styles.validateBtn} variant="primary" onClick={handleValidate}>
            Validate
          </Button>
        )}

        {isValidating && (
          <Button
            className={styles.validateBtn}
            outlined
            variant="primary"
            disabled={seconds > 0}
            onClick={handleResend}
          >
            Resend {seconds} sec
          </Button>
        )}
      </div>
      <div className={styles.right}>
        <YourAppointmentDetails />
      </div>
    </div>
  );
};

export default VerificationAndBook;
