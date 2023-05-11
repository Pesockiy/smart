import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';

import styles from './LocationSlider.module.sass';
import LocationItem from '../LocationItem/LocationItem';
import { geocoder } from '@/helpers';
import getLocationsSortedByDistance from '@/helpers/getLocationsSortedByDistance';

const LocationSlider = ({ locations, map, onSelect, distances = [] }) => {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (map) {
      map.panBy(0, 100);
    }
  }, [map]);

  const handleLocationClick = async (location) => {
    const place = await geocoder({ address: location.address });

    const coordinates = place.results[0].geometry.location;

    if (map) {
      map.panTo(coordinates);
      map.setZoom(13);
      map.panBy(0, 200);

      setSelectedId(location.id);
      onSelect(location.id);
    }
  };

  const sortedLocations = getLocationsSortedByDistance({ locations, distances });

  return (
    <Swiper className={styles.slider} slidesPerView="auto" spaceBetween={16}>
      {sortedLocations.map((location) => {
        return (
          <SwiperSlide key={location.id} className={styles.slide}>
            <LocationItem
              hasBookFreeBtn
              location={location}
              className={styles.locationItem}
              detailsContainerClassName={styles.detailsContainer}
              onLocationClick={() => handleLocationClick(location)}
              selectedId={selectedId}
              distance={location.distance}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default LocationSlider;
