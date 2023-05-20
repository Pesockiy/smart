import { MarkerClusterer } from '@react-google-maps/api';
import MarkersList from '../MarkersList/MarkersList';

const CLUSTERER_OPTIONS = {
  minimumClusterSize: 2,
  styles: [
    {
      url: '/images/location/location-marker.svg',
      textColor: '#141417',
      width: 64,
      height: 64,
    },
  ],
};

const ClustererView = ({ markersLatLng, locations, moveToPosition, activeMarkerId = null }) => {
  if (markersLatLng.length === 0) return null;

  const onMarkerClick = (position) => {
    moveToPosition({ position });
  };

  return (
    <MarkerClusterer options={CLUSTERER_OPTIONS}>
      {(clusterer) => {
        return (
          <MarkersList
            markersLatLng={markersLatLng}
            locations={locations}
            clusterer={clusterer}
            activeMarkerId={activeMarkerId}
            onClick={onMarkerClick}
          />
        );
      }}
    </MarkerClusterer>
  );
};

export default ClustererView;
