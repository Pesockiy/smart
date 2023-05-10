import { GoogleMap } from '@react-google-maps/api';
import { useRef } from 'react';

import { locationMapStyles } from '@/utilits/variables';

const DEFAULT_CENTER = { lat: 33.01982568565792, lng: -117.28095444398336 };
const DEFAULT_ZOOM = 9;
const DEFAULT_MIN_ZOOM = 4;

const MapContainer = ({
  children,
  mapContainerClassName,
  onLoad = () => {},
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  minZoom = DEFAULT_MIN_ZOOM,
  styles = locationMapStyles,
}) => {
  const mapRef = useRef(null);

  const onMapLoad = (map) => {
    onLoad(map);
    mapRef.current = map;
  };

  return (
    <GoogleMap
      zoom={zoom}
      options={{
        styles,
        minZoom,
        scrollwheel: false,
        mapTypeControl: false,
      }}
      onLoad={onMapLoad}
      center={center}
      mapContainerClassName={mapContainerClassName}
    >
      {children}
    </GoogleMap>
  );
};

export default MapContainer;
