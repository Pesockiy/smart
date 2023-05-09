import getLatLngByPlace from './getLatLngByPlace';
import { isEmpty } from './isEmpty';

export const smoothScroll = (offset = 0) => {
  window.scrollTo({
    top: offset,
    behavior: 'smooth',
  });
};

export { isEmpty, getLatLngByPlace };
