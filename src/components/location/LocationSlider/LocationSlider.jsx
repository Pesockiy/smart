import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';

import styles from './LocationSlider.module.sass';
import LocationItem from '../LocationItem/LocationItem';
import { geocoder, getLatLngByPlace } from '@/helpers';
import getLocationsSortedByDistance from '@/helpers/getLocationsSortedByDistance';

const LocationSlider = ({ locations, map, onSelect, setActiveMarkerId, moveToPosition }) => {
  const [selectedId, setSelectedId] = useState(null);

  const sortedLocations = getLocationsSortedByDistance({ locations });

  useEffect(() => {
    if (map) {
      map.panBy(0, 150);
    }
  }, [map]);

  const handleLocationClick = async (location) => {
    try {
      const place = await geocoder({ address: location.address });
      const coordinates = place.results[0].geometry.location;

      moveToPosition({ position: coordinates, zoom: 13, panBy: { x: 0, y: 200 } });
      setSelectedId(location.id);
      onSelect(location.id);
    } catch (error) {
      setSelectedId(null);
    }
  };

  const onSlideChange = async (params) => {
    try {
      const location = sortedLocations[params.activeIndex];

      const point = await geocoder({ address: location.address });
      const coordinates = getLatLngByPlace(point.results[0]);

      moveToPosition({ position: coordinates, zoom: 11, panBy: { x: 0, y: 170 } });
      setActiveMarkerId(location.id);
      setSelectedId(location.id);
    } catch (error) {
      setActiveMarkerId(null);
      setSelectedId(null);
    }
  };

  return (
    <Swiper
      className={styles.slider}
      slidesPerView="auto"
      centeredSlides
      centeredSlidesBounds
      spaceBetween={16}
      onSlideChange={onSlideChange}
    >
      {sortedLocations.map((location) => {
        return (
          <SwiperSlide key={location.id} className={styles.slide}>
            <LocationItem
              tag="div"
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
