import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Virtual } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css';

import { useGeocoder } from '@/hooks';
import styles from './LocationSlider.module.sass';
import LocationItem from '../LocationItem/LocationItem';

const LocationSlider = ({ locations, map, onSelect }) => {
  const [selectedId, setSelectedId] = useState(null);
  const geocode = useGeocoder();

  useEffect(() => {
    if (map) {
      map.panBy(0, 100);
    }
  }, [map]);

  const handleLocationClick = async (location) => {
    const place = await geocode({ address: location.address });

    const coordinates = place.results[0].geometry.location;

    if (map) {
      map.panTo(coordinates);
      map.setZoom(13);
      map.panBy(0, 200);

      setSelectedId(location.id);
      onSelect(location.id);
    }
  };

  return (
    <Swiper
      className={styles.slider}
      modules={[Navigation, Virtual]}
      slidesPerView="auto"
    >
      {locations.map((location) => {
        return (
          <SwiperSlide key={location.id} className={styles.slide}>
            <LocationItem
              hasBookFreeBtn
              location={location}
              className={styles.locationItem}
              detailsContainerClassName={styles.detailsContainer}
              onLocationClick={() => handleLocationClick(location)}
              selectedId={selectedId}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default LocationSlider;
