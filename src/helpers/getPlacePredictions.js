const getPlacePredictions = (value) => {
  return new Promise((resolve, reject) => {
    const service = new window.google.maps.places.AutocompleteService();

    const request = {
      input: value,
    };

    service.getPlacePredictions(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      }
      // TODO: window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS; Not Found;
    });
  });
};

export default getPlacePredictions;
