import Calendar from 'react-calendar';
import { useState } from 'react';
import cx from 'class-names';
import 'react-calendar/dist/Calendar.css';

import Container from '@/common/Container/Container';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import styles from './SelectTime.module.sass';
import Button from '@/common/Button/Button';
import { createTimeSlotsMock } from '@/mock/select-time/time';

const timeArray = createTimeSlotsMock();

const formatDate = ({ options, date }) => {
  const dateFormatter = new Intl.DateTimeFormat('en-US', options);
  return dateFormatter.format(date);
};

const SelectTime = () => {
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
    <Container className={styles.wrapper}>
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

          <div className={styles.calendarContainer}>
            <Calendar
              showFixedNumberOfWeeks
              className={cx(styles.customCalendar, 'time-calendar', styles.timeCalendar)}
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
        </div>
        <div className={styles.btnContainer}>
          <Button outlined variant="secondary">
            Prev
          </Button>
          <Button outlined variant="primary">
            More time
          </Button>
          <Button outlined variant="primary">
            Next
          </Button>
        </div>
      </div>
    </Container>
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

export default SelectTime;
