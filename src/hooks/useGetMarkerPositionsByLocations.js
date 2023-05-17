import { useEffect, useState } from 'react';

import { getLatLngByLocations } from '@/helpers';

const useGetMarkerPositionsByLocations = ({ locations }) => {
  const [markerPositions, setMarkerPositions] = useState([]);

  useEffect(() => {
    const getMarkers = async () => {
      try {
        const positions = await getLatLngByLocations({ locations });
        setMarkerPositions(positions);
      } catch (error) {
        setMarkerPositions([]);
      }
    };

    getMarkers();
  }, []);

  return markerPositions;
};

export default useGetMarkerPositionsByLocations;
