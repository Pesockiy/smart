import { useRef, useState } from 'react';

import { geocoder } from '@/helpers';
import LocationItem from '../LocationItem/LocationItem';
import styles from './LocationsList.module.sass';
import getLocationsSortedByDistance from '@/helpers/getLocationsSortedByDistance';

function LocationsList({ locations, onSelect, setActiveMarkerId, moveToPosition }) {
  const listRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  const sortedLocations = getLocationsSortedByDistance({ locations });

  const onLocationClick = async (location) => {
    try {
      const place = await geocoder({ address: location.address });
      const coordinates = place.results[0].geometry.location;

      moveToPosition({ position: coordinates, zoom: 13, panBy: { x: -120, y: 0 } });
      setSelectedId(location.id);
      onSelect(location.id);
    } catch (error) {
      setSelectedId(null);
    }
  };

  const onScroll = (evt) => {
    if (listRef.current === undefined) return;

    const itemHeight = Math.ceil(listRef.current.scrollHeight / sortedLocations.length - 1);
    const scrollTop = evt.target.scrollTop + evt.target.clientHeight;
    const idx = Math.floor(scrollTop / itemHeight) - 1;

    const location = sortedLocations[idx];

    if (location.position) {
      moveToPosition({ position: location.position, zoom: 13 });
      setSelectedId(location.id);
      setActiveMarkerId(location.id);
    }
  };

  return (
    <div>
      <ul className={styles.list} onScroll={onScroll} ref={listRef}>
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
