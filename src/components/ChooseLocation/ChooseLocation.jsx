import { useRef, useState } from 'react';
import cx from 'class-names';
import Button from '@/common/Button/Button';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import { useLoadScript } from '@react-google-maps/api';
import styles from './ChooseLocation.module.sass';
import MapContainer from '../location/MapContainer/MapContainer';
import ClustererView from '../location/Clusterer/ClustererView';
import { geocoder, getLatLngByPlace } from '@/helpers';
import useGetMarkerPositionsByLocations from '@/hooks/useGetMarkerPositionsByLocations';
import { useBookFreeWorkoutContext } from '@/context/BookFreeWorkoutContext';

const libraries = ['places', 'geometry'];

const ChooseLocation = ({ locations = [] }) => {
  const { isLoaded } = useLoadScript({
    libraries,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const locationItems = locations.map((location) => ({
    ...location,
    id: location.DocID,
    address: `${location.addressLine1} ${location.addressLine2} ${location.city}`,
    email: location.contactEmail,
    phone: location.contactNumber,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <ChooseLocationMap locations={locationItems} isLoaded={isLoaded} />
      </div>
    </div>
  );
};

const ChooseLocationMap = ({ locations, isLoaded }) => {
  const context = useBookFreeWorkoutContext();
  const mapRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  const markerPositions = useGetMarkerPositionsByLocations({ locations, isLoaded });

  const moveToPosition = ({ position, zoom = 13 }) => {
    if (mapRef.current === undefined) return;

    mapRef.current.panTo(position);
    mapRef.current.setZoom(zoom);
  };

  const onSelect = async (id) => {
    try {
      const location = locations.find((item) => item.id === id);

      setSelectedId(location.id);

      const point = await geocoder({ address: location.address });
      const position = getLatLngByPlace(point.results[0]);

      moveToPosition({ position });
      setSelectedId(location.id);
      context.setValues({ location });
    } catch (error) {
      setSelectedId(null);
      context.setValues({ location: null });
    }
  };

  const isNextDisabled = context.formValues.location === null;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <OptionsList onSelect={onSelect} options={locations} selectedId={selectedId} />
          <Button
            variant="primary"
            className={styles.nextBtn}
            onClick={context.handleNext}
            disabled={isNextDisabled}
          >
            Next
          </Button>
        </div>

        {isLoaded ? (
          <MapContainer
            mapContainerClassName={styles.map}
            zoom={10}
            onLoad={(map) => (mapRef.current = map)}
          >
            <ClustererView
              markersLatLng={markerPositions}
              locations={locations}
              selectedId={selectedId}
              moveToPosition={moveToPosition}
            />
          </MapContainer>
        ) : (
          <MapLoader />
        )}
      </div>
    </div>
  );
};

const OptionsList = ({ options, selectedId, onSelect }) => {
  return (
    <div>
      <Heading className={styles.title}>
        <Text gradient as="span">
          Choose Location
        </Text>
      </Heading>

      <ul className={styles.list}>
        {options.map((item) => {
          return (
            <li key={item.addressLine2} className={styles.listItem}>
              <label htmlFor={item.id} className={styles.optionLabel}>
                <input
                  id={item.id}
                  type="checkbox"
                  checked={selectedId === item.id}
                  onChange={() => onSelect(item.id)}
                />
              </label>

              <div className={styles.optionContent}>
                <h2>{item.locationName ?? item.city}</h2>
                <p>
                  {item.addressLine2}, {item.addressLine1} {item.city}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const MapLoader = () => {
  return (
    <div className={cx(styles.map, styles.mapLoader)}>
      <span className={styles.loadingText}>Loading</span>
    </div>
  );
};

export default ChooseLocation;
