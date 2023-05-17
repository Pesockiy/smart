import { useRef, useState } from 'react';
import cx from 'class-names';
import Button from '@/common/Button/Button';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import { useLoadScript } from '@react-google-maps/api';
import styles from './ChooseLocation.module.sass';
import { locationsMock } from '@/mock/locations';
import MapContainer from '../location/MapContainer/MapContainer';
import ClustererView from '../location/Clusterer/ClustererView';
import { geocoder, getLatLngByPlace } from '@/helpers';
import useGetMarkerPositionsByLocations from '@/hooks/useGetMarkerPositionsByLocations';
import { useBookFreeWorkoutContext } from '@/context/BookFreeWorkoutContext';

const libraries = ['places', 'geometry'];

const ChooseLocation = ({ locations = locationsMock }) => {
  const { isLoaded } = useLoadScript({
    libraries,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <ChooseLocationMap locations={locations} isLoaded={isLoaded} />
      </div>
    </div>
  );
};

const ChooseLocationMap = ({ locations, isLoaded }) => {
  const context = useBookFreeWorkoutContext();
  const mapRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const markerPositions = useGetMarkerPositionsByLocations({ locations });

  const zoomByPosition = ({ position, zoom = 13 }) => {
    const map = mapRef.current;

    if (mapRef.current === undefined) return;

    map.panTo(position);
    map.setZoom(zoom);
  };

  const onSelect = async (id) => {
    setSelectedId(null);

    const location = locations.find((item) => item.id === id);

    const point = await geocoder({ address: location.address });

    if (point !== null) {
      const position = getLatLngByPlace(point.results[0]);

      zoomByPosition({ position });
      setSelectedId(location.id);
      context.setValues({ location });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <OptionsList onSelect={onSelect} options={locations} selectedId={selectedId} />
          <Button variant="primary" className={styles.nextBtn} onClick={context.handleNext}>
            Next
          </Button>
        </div>

        {isLoaded ? (
          <MapContainer
            mapContainerClassName={styles.map}
            zoom={10}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            <ClustererView
              markers={markerPositions}
              locations={locations}
              selectedId={selectedId}
              zoomByPosition={zoomByPosition}
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
            <li key={item.id} className={styles.listItem}>
              <label htmlFor={item.id} className={styles.optionLabel}>
                <input
                  id={item.id}
                  type="checkbox"
                  checked={selectedId === item.id}
                  onChange={() => onSelect(item.id)}
                />
              </label>

              <div className={styles.optionContent}>
                <h2>{item.title}</h2>
                <p>{item.address}</p>
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
