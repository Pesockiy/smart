import cx from 'class-names';

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
import Img from '@/common/Img/Img';
import LocationPNG from '@/assets/icons/location.png';
import PhonePNG from '@/assets/icons/phone.png';
import TimePNG from '@/assets/icons/time.png';
import MessagePNG from '@/assets/icons/message.png';
import CopyPNG from '@/assets/icons/copy.png';
import LinkPNG from '@/assets/icons/link.png';

// NOTE: strange issue with SVG icons;
const Icons = {
  location: LocationPNG,
  phone: PhonePNG,
  time: TimePNG,
  message: MessagePNG,
  copy: CopyPNG,
  link: LinkPNG,
};

const LocationItem = ({
  location,
  onLocationClick,
  selectedId,
  distance = null,
  className = styles.listItem,
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
          <Img src={Icons.location} width={20} height={20} />

          <p>{location.address}</p>

          <CopyButton text={location.address} />
        </div>

        <div className={styles.detailsItem}>
          <Img src={Icons.phone} width={20} height={20} />

          <p>{location.phone}</p>

          <PhoneLink phone={location.phone} />
          <CopyButton text={location.phone} />
        </div>

        <div className={styles.detailsItem}>
          <Img src={Icons.message} width={20} height={20} />

          <p>{location.email}</p>

          <EmailLink email={location.email} />
          <CopyButton text={location.email} />
        </div>

        <div className={styles.detailsItem}>
          <Img src={Icons.time} width={20} height={20} />

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

const EmailLink = (email) => {
  return (
    <a href={`mailto:${email}`}>
      {/* <LinkIcon /> */}
      <Img src={Icons.link} width={10} height={10} />
    </a>
  );
};

const PhoneLink = (phone) => {
  return (
    <a href={`tel:${phone}`}>
      {/* <LinkIcon /> */}
      <Img src={Icons.link} width={10} height={10} />
    </a>
  );
};

const CopyButton = (text) => {
  const { onCopy } = useCopy();

  return (
    <button type="button" onClick={() => onCopy(text)}>
      {/* <CopyIcon /> */}
      <Img src={Icons.copy} width={20} height={20} />
    </button>
  );
};

export default LocationItem;
