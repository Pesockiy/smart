import { useEffect, useRef, useState } from 'react';

const useGetLatLngByLocations = ({ locations }) => {
  const geocoderServiceRef = useRef(new google.maps.Geocoder());
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const getPoints = async () => {
      const placesPromise = locations.map((location) => {
        return geocoderServiceRef.current.geocode({
          address: location.address,
        });
      });

      const places = await Promise.all(placesPromise);

      const coordinates = places.map((place) => {
        const point = place.results[0].geometry.location;
        return { lat: point.lat(), lng: point.lng() };
      });

      setPoints(coordinates);
    };

    getPoints();
  }, [locations]);

  return points;
};

export default useGetLatLngByLocations;
