import { useState } from 'react';
import { InfoWindow, MarkerF } from '@react-google-maps/api';

import styles from './MarkersList.module.sass';

const MarkersList = ({ markersLatLng, clusterer, onClick, locations, selectedId }) => {
  const [activeId, setActiveId] = useState(null);

  const icon = {
    url: '/images/location/marker.svg',
    scaledSize: new window.google.maps.Size(50, 50),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(25, 1),
  };

  const onMarkerClick = (marker, idx) => {
    onClick(marker);
    setActiveId(locations[idx].id);
  };

  return (
    <>
      {markersLatLng.map((marker, idx) => {
        const location = locations[idx];
        const isPopUpActive = location.id === activeId || selectedId === location.id;

        return (
          <MarkerF
            key={idx}
            position={marker}
            icon={icon}
            clusterer={clusterer}
            animation={google.maps.Animation.DROP}
            onClick={() => onMarkerClick(marker, idx)}
          >
            {isPopUpActive && (
              <MarkerPopUp
                key={location.id}
                position={marker}
                title={`Smart fir method/${location.title}`}
                onClose={() => setActiveId(null)}
              />
            )}
          </MarkerF>
        );
      })}
    </>
  );
};

const MarkerPopUp = ({ position, title, onClose }) => {
  return (
    <InfoWindow position={position} onCloseClick={onClose}>
      <div className={styles.infoWindow}>
        <h2>{title}</h2>
      </div>
    </InfoWindow>
  );
};

export default MarkersList;
