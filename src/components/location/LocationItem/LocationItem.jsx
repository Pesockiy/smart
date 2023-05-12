import cx from 'class-names';

import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import { useCopy } from '@/hooks';
import MessageIcon from '@/common/MessageIcon/MessageIcon';
import PhoneIcon from '@/common/PhoneIcon/PhoneIcon';
import LocationIcon from '@/common/LocationIcon/LocationIcon';
import TimeIcon from '@/common/TimeIcon/TimeIcon';
import CopyIcon from '@/common/CopyIcon/CopyIcon';
import LinkIcon from '@/common/LinkIcon/LinkIcon';
import ArrowIcon from '@/assets/icons/arrow.svg';
import styles from './LocationItem.module.sass';
import Button from '@/common/Button/Button';

const LocationItem = ({
  location,
  onLocationClick,
  selectedId,
  distance = null,
  hasBookFreeBtn = false,
  className = styles.listItem,
  detailsContainerClassName = '',
}) => {
  const isLocationActive = (location) => location.id === selectedId;
  const wrapperClassName = cx(styles.listItem, className);

  return (
    <li className={wrapperClassName}>
      <header className={styles.header}>
        <Heading size="sm" className={styles.title}>
          <Text as="span" gradient={isLocationActive(location)}>
            {location.title}
          </Text>
        </Heading>

        <button className={styles.arrowBtn} type="button" onClick={() => onLocationClick(location)}>
          <ArrowIcon className={styles.arrow} />
        </button>
      </header>

      <span className={styles.line}></span>

      <div className={cx(styles.details, detailsContainerClassName)}>
        <div className={styles.detailsItem}>
          <div>
            <LocationIcon />
          </div>

          <p>{location.address}</p>

          <CopyButton text={location.address} />
        </div>

        <div className={styles.detailsItem}>
          <div>
            <PhoneIcon />
          </div>

          <p>{location.phone}</p>

          <PhoneLink phone={location.phone} />
          <CopyButton text={location.phone} />
        </div>

        <div className={styles.detailsItem}>
          <div>
            <MessageIcon />
          </div>

          <p>{location.email}</p>

          <EmailLink email={location.email} />
          <CopyButton text={location.email} />
        </div>

        <div className={styles.detailsItem}>
          <div>
            <TimeIcon />
          </div>
          <p className={styles.schedule}>
            <span>Mon-Fri: {location.schedule.weekdays}</span>
            <span>Sat-San: {location.schedule.weekends}</span>
          </p>
        </div>
      </div>

      <div className={styles.miles}>{distance && <div>{distance} miles</div>}</div>

      {hasBookFreeBtn && (
        <Button type="button" variant="primary" className={styles.bookBtn}>
          Book a free session
        </Button>
      )}
    </li>
  );
};

const EmailLink = ({ email }) => {
  return (
    <a href={`mailto:${email}`}>
      <LinkIcon />
    </a>
  );
};

const PhoneLink = ({ phone }) => {
  return (
    <a href={`tel:${phone}`}>
      <LinkIcon />
    </a>
  );
};

const CopyButton = ({ text }) => {
  const { onCopy } = useCopy();

  return (
    <button type="button" onClick={() => onCopy(text)}>
      <CopyIcon />
    </button>
  );
};

export default LocationItem;
