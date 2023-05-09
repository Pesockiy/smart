const getLatLngByPlace = (place) => ({
  lat: place.geometry.location.lat(),
  lng: place.geometry.location.lng(),
});

export default getLatLngByPlace;
