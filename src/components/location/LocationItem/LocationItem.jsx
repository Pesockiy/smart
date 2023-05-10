import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import { useCopy } from '@/hooks';
import MessageIcon from '@/common/MessageIcon/MessageIcon';
import PhoneIcon from '@/common/PhoneIcon/PhoneIcon';
import LocationIcon from '@/common/LocationIcon/LocationIcon';
import TimeIcon from '@/common/TimeIcon/TimeIcon';
import CopyIcon from '@/common/CopyIcon/CopyIcon';
import ArrowIcon from '@/assets/icons/arrow.svg';
import styles from './LocationItem.module.sass';
import LinkIcon from '@/common/LinkIcon/LinkIcon';

const LocationItem = ({
  location,
  onLocationClick,
  selectedId,
  distance = null,
}) => {
  const { onCopy } = useCopy();

  const isLocationActive = (location) => location.id === selectedId;

  return (
    <li className={styles.listItem}>
      <header className={styles.header}>
        <Heading size="sm" className={styles.title}>
          <Text as="span" gradient={isLocationActive(location)}>
            {location.title}
          </Text>
        </Heading>

        <button
          className={styles.arrowBtn}
          type="button"
          onClick={() => onLocationClick(location)}
        >
          <ArrowIcon className={styles.arrow} />
        </button>
      </header>

      <span className={styles.line}></span>

      <div className={styles.details}>
        <div className={styles.detailsItem}>
          <LocationIcon />
          <p>{location.address}</p>
          <button type="button" onClick={() => onCopy(location.address)}>
            <CopyIcon />
          </button>
        </div>

        <div className={styles.detailsItem}>
          <PhoneIcon />
          <p>{location.phone}</p>

          <a href={`tel:${location.phone}`}>
            <LinkIcon />
          </a>

          <button type="button" onClick={() => onCopy(location.phone)}>
            <CopyIcon />
          </button>
        </div>

        <div className={styles.detailsItem}>
          <MessageIcon />
          <p>{location.email}</p>

          <a href={`mailto:${location.email}`}>
            <LinkIcon />
          </a>

          <button type="button" onClick={() => onCopy(location.email)}>
            <CopyIcon />
          </button>
        </div>

        <div className={styles.detailsItem}>
          <TimeIcon />
          <p className={styles.schedule}>
            <span>Mon-Fri: {location.schedule.weekdays}</span>
            <span>Sat-San: {location.schedule.weekends}</span>
          </p>
        </div>

        <div className={styles.miles}>
          {distance && <div>{distance} miles</div>}
        </div>
      </div>
    </li>
  );
};

export default LocationItem;
