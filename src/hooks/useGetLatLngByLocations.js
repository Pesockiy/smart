import { useEffect, useRef, useState } from 'react';

const useGetLatLngByLocations = ({ locations, isLoaded }) => {
  const geocoderServiceRef = useRef(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const getPoints = async () => {
      if (typeof google !== 'undefined') {
        geocoderServiceRef.current = new google.maps.Geocoder();

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
      }
    };

    getPoints();
  }, [locations, isLoaded]);

  return points;
};

export default useGetLatLngByLocations;
