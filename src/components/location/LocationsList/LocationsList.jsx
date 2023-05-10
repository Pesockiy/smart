import { useGeocoder } from '@/hooks';
import { useState } from 'react';
import LocationItem from '../LocationItem/LocationItem';
import styles from './LocationsList.module.sass';

function LocationsList({ locations, map, onSelect, distances = [] }) {
  const [selectedId, setSelectedId] = useState(null);
  const geocode = useGeocoder();

  const locationsWithDistance = locations.map((location, idx) => ({
    ...location,
    distance: distances[idx],
  }));

  const sortedByDistance = [...locationsWithDistance].sort(
    (prev, current) => prev.distance - current.distance
  );

  const onLocationClick = async (location) => {
    const place = await geocode({ address: location.address });

    const coordinates = place.results[0].geometry.location;

    if (map) {
      map.panTo(coordinates);
      map.setZoom(13);

      setSelectedId(location.id);
      onSelect(location.id);
    }
  };

  return (
    <div>
      <ul className={styles.list}>
        {sortedByDistance.map((location) => (
          <LocationItem
            key={location.id}
            location={location}
            onLocationClick={onLocationClick}
            selectedId={selectedId}
            distance={location.distance}
          />
        ))}
      </ul>
    </div>
  );
}

export default LocationsList;
