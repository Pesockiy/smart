import { useRef } from 'react';

const useGeocoder = () => {
  const geocoderRef = useRef(new google.maps.Geocoder());

  const geocode = ({ address }) => {
    return geocoderRef.current.geocode({
      address,
    });
  };

  return geocode;
};

export default useGeocoder;
