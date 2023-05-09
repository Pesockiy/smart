import useComputeDistanceBetweenPoints from './useComputeDistanceBetweenPoints';
import useDistanceMatrixService from './useDistanceMatrixService';
import useGeocoder from './useGeocoder';

const useCalculateRoutesDistance = () => {
  const { calculateDistance } = useDistanceMatrixService();
  const computeDistanceBetween = useComputeDistanceBetweenPoints();
  const geocode = useGeocoder();

  const isOk = (status) => status === 'OK';

  const calculateRoutesDistance = async ({ from, to }) => {
    const distance = await calculateDistance({ from, to });

    const rowsPromise = distance.rows[0].elements.map(async (row, idx) => {
      if (isOk(row.status)) {
        return row;
      }

      const place = await geocode({
        address: distance.destinationAddresses[idx],
      });

      const sphericalDistance = computeDistanceBetween({
        from,
        to: place.results[0].geometry.location,
      });

      return { distance: { value: sphericalDistance } };
    });

    const rows = await Promise.all(rowsPromise);

    const miles = rows.map((row) => {
      return Math.ceil((row.distance.value / 1000) * 0.621371);
    });

    return miles;
  };

  return calculateRoutesDistance;
};

export default useCalculateRoutesDistance;
