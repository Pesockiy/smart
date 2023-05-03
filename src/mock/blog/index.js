import PopularImg from './images/popular.jpg';
import generatePostsByAmount from './posts';

export const postsMock = generatePostsByAmount(200);

export const popularPostsMock = [
  { ...generatePostsByAmount(4)[0], image: PopularImg.src },
  ...generatePostsByAmount(4).slice(1, 4),
];
