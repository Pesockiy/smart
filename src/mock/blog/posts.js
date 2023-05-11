import PostUrl1 from './images/post1.jpg';
import PostUrl2 from './images/post2.png';
import PostUrl3 from './images/post3.jpg';
import PostUrl4 from './images/post4.jpg';
import PostUrl5 from './images/post5.jpg';

function generatePostsByAmount({
  amount = 6,
  types = ['post'],
  images = blogImages,
  videos = null,
}) {
  return Array.from({ length: amount }).map((_, idx) => {
    const type = getRandomFromList(types);

    return {
      type,
      id: idx + 1,
      title: getRandomFromList(titles),
      description: getRandomFromList(description),
      image: getRandomFromList(images),
      createdAt: generateRandomDate({
        start: new Date(2021, 0, 1),
        end: new Date(),
      }),
      updatedAt: generateRandomDate({
        start: new Date(2021, 0, 1),
        end: new Date(),
      }),
      ...(type === 'video' && videos !== null
        ? { video: getRandomFromList(videos) }
        : { video: null }),
    };
  });
}

const getRandomFromList = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const generateRandomDate = ({ start, end }) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const blogImages = [
  PostUrl1.src,
  PostUrl2.src,
  PostUrl3.src,
  PostUrl4.src,
  PostUrl5.src,
];

const titles = [
  'LiveO2 and EWOT therapy–the latest way the Smart Fit Method works for you.',
  'Get to Know the Smart Charge (BioCharger NG).',
  'The fit3d smart body scan: the key to your smart fit success.',
  'What is the Сarol bike and why is it so awesome?',
  'What is the Vasper mashine and how does it compliment your workouts?',
  'How strenght training can reverse aging... and why the ARX is the very best way to do it.',
];
const description = [
  'What would your body do with extra oxygen during exercise if it had it? Quite a lot, it turns out. With added O2, our blood. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure dignissimos minima assumenda rem id vel in, sit eius quisquam ipsum explicabo provident ipsa mollitia expedita culpa nesciunt harum placeat odio?',
  'What is a BioCharger ? According to the environmental protection agency (EPA), the average American spends 93% of their life indoors. 87% of their life. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure dignissimos minima assumenda rem id vel in, sit eius quisquam ipsum explicabo provident ipsa mollitia expedita culpa nesciunt harum placeat odio?',
  'The Fit3D Smart Body Scan is a key component of the data driven formula that is the Smart Fit Method. Digitally mapping millions of data. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure dignissimos minima assumenda rem id vel in, sit eius quisquam ipsum explicabo provident ipsa mollitia expedita culpa nesciunt harum placeat odio?',
  'While the CAROL appears to be a basic spin bike, it’s actually enhanced by AI (Artificial Intelligence) to create a workout that is optimized to. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure dignissimos minima assumenda rem id vel in, sit eius quisquam ipsum explicabo provident ipsa mollitia expedita culpa nesciunt harum placeat odio?',
  'The Vasper is a revolutionary fitness machine that combines compression, liquid cooling, and interval training. Originally invented to help astronauts recover from the muscle atrophy, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure dignissimos minima assumenda rem id vel in, sit eius quisquam ipsum explicabo provident ipsa mollitia expedita culpa nesciunt harum placeat odio?',
  'What if you knew there was one activity you could do regularly that could keep you so healthy, it could even reverse the aging process?. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure dignissimos minima assumenda rem id vel in, sit eius quisquam ipsum explicabo provident ipsa mollitia expedita culpa nesciunt harum placeat odio?',
];

export default generatePostsByAmount;
