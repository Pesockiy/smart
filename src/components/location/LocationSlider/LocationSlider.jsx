import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';

import styles from './LocationSlider.module.sass';
import LocationItem from '../LocationItem/LocationItem';
import { geocoder, getLatLngByPlace } from '@/helpers';
import getLocationsSortedByDistance from '@/helpers/getLocationsSortedByDistance';

const LocationSlider = ({ locations, map, onSelect, setActiveMarkerId }) => {
  const [selectedId, setSelectedId] = useState(null);

  const sortedLocations = getLocationsSortedByDistance({ locations });

  useEffect(() => {
    if (map) {
      map.panBy(0, 150);
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

  const onSlideChange = async (params) => {
    const location = sortedLocations[params.activeIndex];

    const point = await geocoder({ address: location.address });
    const coordinates = getLatLngByPlace(point.results[0]);

    map.panTo(coordinates);
    map.setZoom(11);
    map.panBy(0, 170);

    setActiveMarkerId(location.id);
    setSelectedId(location.id);
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
