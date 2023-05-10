const geocoder = ({ address }) => {
  const geocoder = new google.maps.Geocoder();
  return geocoder.geocode({ address });
};

export default geocoder;
