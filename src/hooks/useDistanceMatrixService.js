import { useRef } from 'react';

const useDistanceMatrixService = () => {
  const distanceServiceRef = useRef(new google.maps.DistanceMatrixService());

  const calculateDistance = ({ from, to }) => {
    const request = {
      origins: [from],
      destinations: to,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false,
    };

    return distanceServiceRef.current.getDistanceMatrix(request);
  };

  return {
    calculateDistance,
    distanceService: distanceServiceRef.current,
  };
};

export default useDistanceMatrixService;
