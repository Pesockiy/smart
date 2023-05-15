import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';

import styles from './LocationSlider.module.sass';
import LocationItem from '../LocationItem/LocationItem';
import { geocoder, getLatLngByPlace } from '@/helpers';
import getLocationsSortedByDistance from '@/helpers/getLocationsSortedByDistance';

const LocationSlider = ({ locations, map, onSelect }) => {
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

  const onSlideChange = async (params) => {
    const point = await geocoder({ address: sortedLocations[params.activeIndex].address });
    const coordinates = getLatLngByPlace(point.results[0]);

    map.panTo(coordinates);
    map.setZoom(11);
  };

  const sortedLocations = getLocationsSortedByDistance({ locations });

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

function Slide({
  hasBookFreeBtn,
  location,
  className,
  detailsContainerClassName,
  onLocationClick,
  selectedId,
  distance,
}) {
  const swiperSlide = useSwiperSlide();
  console.log({ swiperSlide });
  return (
    <LocationItem
      hasBookFreeBtn={hasBookFreeBtn}
      location={location}
      className={styles.locationItem}
      detailsContainerClassName={styles.detailsContainer}
      onLocationClick={onLocationClick}
      selectedId={selectedId}
      distance={distance}
    />
  );
}

export default LocationSlider;
