import { useRef } from 'react';

const useComputeDistanceBetweenPoints = () => {
  const computeDistanceRef = useRef(
    google.maps.geometry.spherical.computeDistanceBetween
  );

  const computeDistanceBetween = ({ from, to }) => {
    return computeDistanceRef.current(from, to);
  };

  return computeDistanceBetween;
};

export default useComputeDistanceBetweenPoints;
