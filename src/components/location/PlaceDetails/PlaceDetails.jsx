import Button from '@/common/Button/Button';
import Heading from '@/common/Heading/Heading';
import Rating from '@/components/Rating/Rating';
import CloseIcon from '@/common/CloseIcon/CloseIcon';
import Logo from '@/assets/icons/logo.svg';

import styles from './PlaceDetails.module.sass';

const PlaceDetails = ({ place, onClose }) => {
  const locality = getLocality(place.address_components);
  const hasPlaceInfo = place.rating || place.reviews;

  return (
    <div className={styles.googleInfoBox}>
      <PlacePhoto photos={place.photos} />

      <div className={styles.infoBoxContent}>
        <Heading size="sm">{locality.short_name}</Heading>

        {hasPlaceInfo && (
          <div className={styles.googleDetails}>
            {place.rating && (
              <div className={styles.ratingWrapper}>
                <span>{place.rating}</span>
                <Rating rating={place.rating} count={5} />
              </div>
            )}

            {place.reviews && (
              <p className={styles.reviews}>{place.reviews.length} Google reviews</p>
            )}
          </div>
        )}

        <p>{place.formatted_address}</p>

        <Button variant="primary" className={styles.bookFreeBtn}>
          Book a free workout
        </Button>
      </div>

      <button className={styles.infoBoxCloseBtn} type="button" onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  );
};

const PlacePhoto = ({ photos = [] }) => {
  return photos.length > 0 ? (
    <img className={styles.infoBoxImg} src={photos[0].getUrl()} />
  ) : (
    <div className={styles.placeholder}>
      <Logo />
    </div>
  );
};

const getLocality = (addressComponents) => {
  return addressComponents.find((p) => {
    return p.types.includes('locality');
  });
};

export default PlaceDetails;
