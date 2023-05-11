import calculateDistance from './calculateDistance';
import computeDistanceBetweenPoints from './computeDistanceBetweenPoints';
import geocoder from './geocoder';

const calculateRoutesDistance = async ({ from, to }) => {
  const distance = await calculateDistance({ from, to });

  const rowsPromise = distance.rows[0].elements.map(async (row, idx) => {
    if (row.status === 'OK') {
      return row;
    }

    const place = await geocoder({
      address: distance.destinationAddresses[idx],
    });

    const sphericalDistance = computeDistanceBetweenPoints({
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

export default calculateRoutesDistance;
