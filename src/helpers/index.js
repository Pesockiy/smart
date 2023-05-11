import geocoder from './geocoder';
import getLatLngByPlace from './getLatLngByPlace';
import getPlacePredictions from './getPlacePredictions';
import { isEmpty } from './isEmpty';

export const smoothScroll = (offset = 0) => {
  window.scrollTo({
    top: offset,
    behavior: 'smooth',
  });
};

export { isEmpty, getLatLngByPlace, geocoder, getPlacePredictions };
