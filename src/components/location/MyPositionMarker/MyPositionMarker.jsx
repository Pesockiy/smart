import { MarkerF } from '@react-google-maps/api';

const MyPositionMarker = ({ position }) => {
  const icon = {
    url: '/images/location/location-marker.svg',
    scaledSize: new window.google.maps.Size(20, 20),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(15, 15),
  };

  return <MarkerF position={position} icon={icon} />;
};

export default MyPositionMarker;
