import Calendar from 'react-calendar';
import { useState } from 'react';
import cx from 'class-names';
import 'react-calendar/dist/Calendar.css';

import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import styles from './SelectTime.module.sass';
import Button from '@/common/Button/Button';
import { createTimeSlotsMock } from '@/mock/select-time/time';
import { useBookFreeWorkoutContext } from '@/context/BookFreeWorkoutContext';
import PhoneIcon from '@/common/PhoneIcon/PhoneIcon';
import MessageIcon from '@/common/MessageIcon/MessageIcon';
import { CallLink } from '@/common/CallLink/CallLink';
import { EmailLink } from '@/common/EmailLink/EmailLink';
import CloseIcon from '@/common/CloseIcon/CloseIcon';

const timeArray = createTimeSlotsMock();
const formatDate = ({ options, date }) => {
  const dateFormatter = new Intl.DateTimeFormat('en-US', options);
  return dateFormatter.format(date);
};

const SelectTime = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const context = useBookFreeWorkoutContext();

  return (
    <>
      {isInfoModalOpen && (
        <InfoModal
          onClose={() => setIsInfoModalOpen(false)}
          email={context.formValues.location.email}
          phone={context.formValues.location.phone}
        />
      )}
      <div className={styles.wrapper}>
        <div className={styles.innerDateWrapper}>
          <div className={styles.leftDateBlock}>
            <InfoList />
          </div>
          <div className={styles.rightDateBlock}>
            <Heading className={styles.dateTitle}>
              <Text as="span" gradient>
                Select Date & Time
              </Text>
            </Heading>

            <CustomCalendar />
          </div>
          <div className={styles.btnContainer}>
            <Button outlined variant="secondary" onClick={context.handlePrev}>
              Prev
            </Button>
            <Button outlined variant="primary" onClick={() => setIsInfoModalOpen(true)}>
              More time
            </Button>
            <Button outlined variant="primary" onClick={context.handleNext}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const CustomCalendar = () => {
  const [value, onChange] = useState(() => new Date());
  const [time, setTime] = useState(null);

  const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  };

  const selectedDate = formatDate({ options, date: value });

  const onSetTime = (t) => setTime(t);

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        showFixedNumberOfWeeks
        className={cx(styles.customCalendar, styles.timeCalendar)}
        onChange={onChange}
        value={value}
        prev2Label={null}
        next2Label={null}
        minDate={new Date()}
      />
      <div className={styles.timeSlots}>
        <div className={styles.selectedDate}>{selectedDate}</div>
        <TimeSlotList time={time} slots={timeArray} onSetTime={onSetTime} />
      </div>
    </div>
  );
};

const InfoList = () => {
  return (
    <ul className={styles.dateInfoList}>
      <li>
        <Heading as="h3" className={styles.dateDetailsTitle}>
          01. Try one of our machines
        </Heading>
      </li>
      <li>
        <Heading as="h3" className={styles.dateDetailsTitle}>
          02. Professional Guidance
        </Heading>
        <p className={styles.dateDetailsDescription}>
          Our certified personal trainers will show you how and why our state-of-the-art facility
          and machines are the best way to workout.
        </p>
      </li>
      <li>
        <Heading as="h3" className={styles.dateDetailsTitle}>
          03. New way... new you
        </Heading>
        <p className={styles.dateDetailsDescription}>
          Experience a brand new way to work out in less time than ever before
        </p>
      </li>
    </ul>
  );
};

const TimeSlotList = ({ slots, time, onSetTime }) => {
  return (
    <ul className={styles.timeSlotList}>
      {slots.length === 0 && <li className={styles.notTimeSlots}>No time slots available.</li>}

      {slots.map((item) => {
        return (
          <li key={item}>
            <button
              type="button"
              className={cx(styles.timeSlotBtn, {
                [styles.activeTimeSlot]: time === item,
              })}
              onClick={() => onSetTime(item)}
            >
              {item}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const InfoModal = ({ onClose = () => {}, phone = '', email = '' }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <Heading className={styles.modalTitle}>Did not find a time that works for you?</Heading>
        <p className={styles.modalDescription}>
          Availability is only shown within the next 3 days, check back again at a later time or
          please text/sms or email us directly.
        </p>

        <p className={styles.contact}>
          <MessageIcon />
          {email}
          <EmailLink className={styles.message} email={email} />
        </p>

        <p className={styles.contact}>
          <PhoneIcon />
          {phone}
          <CallLink className={styles.call} phone={phone} />
        </p>

        <button className={styles.closeModalBtn} type="button" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default SelectTime;
