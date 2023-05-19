import styles from './YourAppointmentDetails.module.sass';
import { useBookFreeWorkoutContext } from '@/context/BookFreeWorkoutContext';
import Heading from '@/common/Heading/Heading';
import PhoneIcon from '@/common/PhoneIcon/PhoneIcon';
import MessageIcon from '@/common/MessageIcon/MessageIcon';
import LocationIcon from '@/common/LocationIcon/LocationIcon';
import CalendarIcon from '@/assets/icons/calendar.svg';
import { formatDate } from '@/helpers';
import Button from '@/common/Button/Button';

const YourAppointmentDetails = ({ hasAddToCalendarBtn = false }) => {
  const context = useBookFreeWorkoutContext();

  const { location, time, date } = context.formValues;

  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };

  const formattedDate = formatDate({ date, options });

  return (
    <div className={styles.appointment}>
      <Heading as="h3" className={styles.detailsTitle}>
        Your Appointment Details
      </Heading>

      <p className={styles.time}>
        <CalendarIcon /> {formattedDate} at {time}
      </p>
      <p className={styles.location}>
        <LocationIcon />
        {location.address}
      </p>

      {location.email && location.phone && (
        <div className={styles.infoMessageWrapper}>
          <p>
            Did not receive the code? Please verify that your number is correct. If you have any
            questions please don’t hesitate to text/call us at {location.phone} or via email
            {location.email}
          </p>
        </div>
      )}

      {location.phone && (
        <p className={styles.phone}>
          <PhoneIcon />
          {location.phone}
        </p>
      )}

      {location.email && (
        <p className={styles.email}>
          <MessageIcon />
          {location.email}
        </p>
      )}

      {hasAddToCalendarBtn && (
        <Button outlined className={styles.addToCalendarBtn}>
          Add to calendar
        </Button>
      )}
    </div>
  );
};

export default YourAppointmentDetails;
