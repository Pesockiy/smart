import { useEffect, useState } from 'react';

import { getLatLngByLocations } from '@/helpers';

const useGetMarkerPositionsByLocations = ({ locations }) => {
  const [markerPositions, setMarkerPositions] = useState([]);

  useEffect(() => {
    const getMarkers = async () => {
      const positions = await getLatLngByLocations({ locations });
      setMarkerPositions(positions);
    };

    getMarkers();
  }, []);

  return markerPositions;
};

export default useGetMarkerPositionsByLocations;
