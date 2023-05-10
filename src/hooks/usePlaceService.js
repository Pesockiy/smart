const usePlaceService = () => {
  const getPlaceDetails = ({ placeId, map }) => {
    const request = {
      placeId,
      fields: [
        'photo',
        'rating',
        'name',
        'formatted_address',
        'reviews',
        'address_components',
        'geometry',
      ],
    };

    return new Promise((resolve, reject) => {
      const placeService = new window.google.maps.places.PlacesService(map);

      placeService.getDetails(request, (place, status) => {
        if (status === 'OK') {
          resolve(place);
        } else {
          reject(new Error(`Get place details failed: ${status}`));
        }
      });
    });
  };

  return getPlaceDetails;
};

export default usePlaceService;
