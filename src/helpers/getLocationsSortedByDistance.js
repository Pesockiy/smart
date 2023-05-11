const getLocationsSortedByDistance = ({ locations, distances }) => {
  // TODO: should not rely on idx;
  const locationsWithDistance = locations.map((location, idx) => ({
    ...location,
    distance: distances[idx],
  }));

  const sortedByDistance = [...locationsWithDistance].sort(
    (prev, current) => prev.distance - current.distance
  );

  return sortedByDistance;
};

export default getLocationsSortedByDistance;
