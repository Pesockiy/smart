const getLocationsSortedByDistance = ({ locations }) => {
  return [...locations].sort((prev, current) => prev.distance - current.distance);
};

export default getLocationsSortedByDistance;
