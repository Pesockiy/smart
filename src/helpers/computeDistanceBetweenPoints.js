const computeDistanceBetweenPoints = ({ from, to }) => {
  return google.maps.geometry.spherical.computeDistanceBetween(from, to);
};

export default computeDistanceBetweenPoints;
