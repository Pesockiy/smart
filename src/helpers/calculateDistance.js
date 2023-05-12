const calculateDistance = ({ from, to }) => {
  const distanceService = new google.maps.DistanceMatrixService();

  const request = {
    origins: [from],
    destinations: to,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false,
  };

  return distanceService.getDistanceMatrix(request);
};

export default calculateDistance;
