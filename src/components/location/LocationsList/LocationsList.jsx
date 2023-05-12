import { useState } from 'react';

import { geocoder } from '@/helpers';
import LocationItem from '../LocationItem/LocationItem';
import styles from './LocationsList.module.sass';
import getLocationsSortedByDistance from '@/helpers/getLocationsSortedByDistance';

function LocationsList({ locations, map, onSelect, distances = [] }) {
  const [selectedId, setSelectedId] = useState(null);

  const onLocationClick = async (location) => {
    const place = await geocoder({ address: location.address });

    const coordinates = place.results[0].geometry.location;

    if (map) {
      map.panTo(coordinates);
      map.setZoom(13);

      setSelectedId(location.id);
      onSelect(location.id);
    }
  };

  const sortedLocations = getLocationsSortedByDistance({ locations, distances });

  return (
    <div>
      <ul className={styles.list}>
        {sortedLocations.map((location) => (
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
