import { useRef, useState } from 'react';

import { geocoder } from '@/helpers';
import LocationItem from '../LocationItem/LocationItem';
import styles from './LocationsList.module.sass';
import getLocationsSortedByDistance from '@/helpers/getLocationsSortedByDistance';

function LocationsList({ locations, map, onSelect, setActiveMarkerId }) {
  const listRef = useRef(null);
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

  const sortedLocations = getLocationsSortedByDistance({ locations });

  const onScroll = (evt) => {
    if (listRef.current !== undefined) {
      const itemHeight = Math.ceil(listRef.current.scrollHeight / sortedLocations.length - 1);
      const scrollTop = evt.target.scrollTop + evt.target.clientHeight;
      const idx = Math.floor(scrollTop / itemHeight) - 1;

      const location = sortedLocations[idx];

      map.panTo(location.position);
      map.setZoom(13);

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
