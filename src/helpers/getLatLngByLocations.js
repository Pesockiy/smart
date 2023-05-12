import geocoder from './geocoder';
import getLatLngByPlace from './getLatLngByPlace';

const getLatLngByLocations = async ({ locations }) => {
  const placesPromise = locations.map((location) => {
    return geocoder({
      address: location.address,
    });
  });

  const places = await Promise.all(placesPromise);

  const coordinates = places.map((place) => {
    return getLatLngByPlace(place.results[0]);
  });

  return coordinates;
};

export default getLatLngByLocations;
