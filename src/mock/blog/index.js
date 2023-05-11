import PopularImg from './images/popular.jpg';
import Press1 from './images/press1.png';
import Press2 from './images/press2.png';
import Press3 from './images/press3.png';
import Press4 from './images/press4.png';
import Press5 from './images/press5.png';
import Press6 from './images/press6.png';
import Press7 from './images/press8.png';
import Press9 from './images/press9.png';
import Press10 from './images/press10.png';
import generatePostsByAmount from './posts';

export const postsMock = generatePostsByAmount({ amount: 200 });

export const pressPostsMock = generatePostsByAmount({
  amount: 400,
  types: ['pdf', 'video', 'website'],
  videos: [
    '/videos/1.mp4',
    '/videos/2.mp4',
    '/videos/3.mp4',
    '/videos/4.mp4',
    '/videos/5.mp4',
  ],
  images: [
    Press1.src,
    Press2.src,
    Press3.src,
    Press4.src,
    Press5.src,
    Press6.src,
    Press7.src,
    Press9.src,
    Press10.src,
  ],
});

export const pinnedBlogPostsMock = [
  { ...generatePostsByAmount(4)[0], image: PopularImg.src },
  ...generatePostsByAmount(4).slice(1, 4),
];

export const pinnedPressPostsMock = [pressPostsMock[0]];
