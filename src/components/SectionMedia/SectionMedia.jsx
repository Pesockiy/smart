import { forwardRef } from 'react';
import cx from 'class-names';

import BaseSlider from '@/components/BaseSlider/BaseSlider';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import Button from '@/common/Button/Button';
import Card from '@/common/Card/Card';

import { Posts } from '@/pages/media';

import PostsList from '../media/PostsList/PostsList';

import styles from './SectionMedia.module.sass';

const SectionMedia = forwardRef(({ posts }, ref) => {
  const options = [
    { label: 'Blog', value: 'blog' },
    { label: 'Press', value: 'press' },
  ];

  return (
    <SectionContainer ref={ref} className={styles.sectionMedia}>
      <div className={styles.sectionMediaTop}>
        <Heading as="h2" size="xl" className={styles.sectionMediaTitle}>
          <Text as="span" gradient>
            Media
          </Text>
        </Heading>

        <PostsList posts={posts} />
        {/* <BlogButtonGroup options={options}></BlogButtonGroup> */}

        <Button href="/media" variant="outlined" className={styles.heroButton}>
          See all media
        </Button>
      </div>

      {/* <BaseSlider
        breakpoints={{
          320: {
            width: 320,
            slidesPerView: 1.1,
          },
          1200: {
            width: 1200,
            slidesPerGroup: 3,
          },
        }}
        spaceBetween={20}
        data={posts}
        renderSlide={(posts) => <PostItem data={posts} />}
      /> */}
    </SectionContainer>
  );
});

export default SectionMedia;

export const getServerSideProps = async (context) => {
  const { query } = context;

  const page = Number(query.page) || 1;
  const type = query.type ?? MEDIA_TYPES.blog;
  const limit = type === MEDIA_TYPES.blog ? DEFAULT_POSTS_LIMIT : DEFAULT_PRESS_LIMIT;

  const response = await Promise.all([
    Posts.pinned({ type }),
    Posts.get({ type, limit, offset: (page - DEFAULT_PAGE) * limit }),
  ]);

  const [pinned, posts] = await Promise.all(response.map((res) => res.json()));

  return {
    props: {
      type,
      posts: posts.items,
      count: posts.count,
      pinned: {
        items: pinned.items,
      },
    },
  };
};

const posts = [
  {
    description: 'Apr 19/22',
    url: '/images/media/1.jpg',
    date: 'Apr 19/22',
    title: 'LiveO2 and EWOT therapy–the latest way the Smart Fit Method works for you.',
    text: 'What would your body do with extra oxygen during exercise if it had it? Quite a lot, it turns out. With added O2, our blood… Read more',
  },
  {
    description: 'Apr 19/22',
    url: '/images/media/1.jpg',
    date: 'Apr 19/22',
    title: 'LiveO2 and EWOT therapy–the latest way the Smart Fit Method works for you.',
    text: 'What would your body do with extra oxygen during exercise if it had it? Quite a lot, it turns out. With added O2, our blood… Read more',
  },
];

const PostItem = ({ data }) => {
  const { url, description, title, text } = data;

  const imgParams = {
    src: url,
    alt: title,
    width: 427,
    height: 276,
    imgClassName: styles.postItemImg,
  };

  return (
    <Card img={imgParams} className={styles.postItem}>
      <div className={styles.postItemSubtitle}>{description}</div>
      <Heading as="h6" size="xs" className={styles.postItemTitle}>
        {title}
      </Heading>
      <Text className={styles.postItemItemText}>{text}</Text>
    </Card>
  );
};

const sectionMediaData = [
  {
    avatar: '/images/listen/1.jpg',
    description: 'Dec 01/22  30 min',
    title: 'Costa Mesa Pod Ep. 22 - Smart Fit Method',
    text: 'by Holly McDonald',
    links: [
      {
        href: '#',
        label: 'Listen on buzzproud',
      },
    ],
  },
  {
    avatar: '/images/listen/1.jpg',
    description: 'Dec 01/22  30 min',
    title: 'Costa Mesa Pod Ep. 22 - Smart Fit Method',
    text: 'by Holly McDonald',
    links: [
      {
        href: '#',
        label: 'Listen on buzzproud',
      },
    ],
  },
  {
    avatar: '/images/listen/2.jpg',
    description: 'Dec 01/22  30 min',
    title: '260: Misson To Cure An Aortic Aneurysm - The SmartFit Method',
    text: 'by Brad Williams',
    links: [
      {
        href: '#',
        label: 'Listen on apple',
      },
      {
        href: '#',
        label: 'Listen on spotify',
      },
    ],
  },
  {
    avatar: '/images/listen/2.jpg',
    description: 'Dec 01/22  30 min',
    title: 'Costa Mesa Pod Ep. 22 - Smart Fit Method',
    text: 'by Holly McDonald',
    links: [
      {
        href: '#',
        label: 'Listen on buzzproud',
      },
    ],
  },
  {
    avatar: '/images/listen/1.jpg',
    description: 'Dec 01/22  30 min',
    title: '260: Misson To Cure An Aortic Aneurysm - The SmartFit Method',
    text: 'by Brad Williams',
    links: [
      {
        href: '#',
        label: 'Listen on apple',
      },
      {
        href: '#',
        label: 'Listen on spotify',
      },
    ],
  },
  {
    avatar: '/images/listen/1.jpg',
    description: 'Dec 01/22  30 min',
    title: 'Costa Mesa Pod Ep. 22 - Smart Fit Method',
    text: 'by Holly McDonald',
    links: [
      {
        href: '#',
        label: 'Listen on buzzproud',
      },
    ],
  },
  {
    avatar: '/images/listen/1.jpg',
    description: 'Dec 01/22  30 min',
    title: 'Costa Mesa Pod Ep. 22 - Smart Fit Method',
    text: 'by Holly McDonald',
    links: [
      {
        href: '#',
        label: 'Listen on buzzproud',
      },
    ],
  },
  {
    avatar: '/images/listen/1.jpg',
    description: 'Dec 01/22  30 min',
    title: 'Costa Mesa Pod Ep. 22 - Smart Fit Method',
    text: 'by Holly McDonald',
    links: [
      {
        href: '#',
        label: 'Listen on buzzproud',
      },
    ],
  },
];
