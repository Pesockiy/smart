import { formatPostDate } from './formatPostDate';
import { getPaginationSteps, isItDots } from './getPaginationSteps';
import { truncateTextByLength } from './truncateTextByLength';

const smoothScroll = (offset = 0) => {
  window.scrollTo({
    top: offset,
    behavior: 'smooth',
  });
};

export {
  truncateTextByLength,
  isItDots,
  getPaginationSteps,
  smoothScroll,
  formatPostDate,
};
