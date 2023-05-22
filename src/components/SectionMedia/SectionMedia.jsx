import { forwardRef } from 'react';
import cx from 'class-names';

import BaseSlider from '@/components/BaseSlider/BaseSlider';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import Button from '@/common/Button/Button';
import PostItem from '../media/PostItem/PostItem';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Container from '@/common/Container/Container';

import generatePostsByAmount from '@/mock/blog/posts';

import { TYPE_OF_FRANCHISING_OPTIONS } from './../../utilits/variables';

import styles from './SectionMedia.module.sass';

const defaultValues = {
  cashToInvest: null,
  email: '',
  fullName: '',
  howDoYouHearAboutUs: null,
  isAgree: false,
  phone: '',
  sourcesOfIncome: '',
  stateOfInterest: null,
  territory: '',
  whyAreYouInterested: '',
  typeOfFranchising: TYPE_OF_FRANCHISING_OPTIONS[0],
};

const SectionMedia = forwardRef(({ posts }, ref) => {
  const postsMock = generatePostsByAmount({ amount: 6 });

  return (
    <SectionContainer ref={ref} className={styles.sectionMedia}>
      <div className={styles.sectionMediaTop}>
        <Heading as="h2" size="xl" className={styles.sectionMediaTitle}>
          <Text as="span" gradient>
            Media
          </Text>
        </Heading>
        <ButtonGroup
          options={TYPE_OF_FRANCHISING_OPTIONS}
          wrapperClassName={styles.typesBtnGroup}
          defaultOption={defaultValues.typeOfFranchising}
        />

        <Button href="/media" variant="outlined" className={styles.sectionMediaButton}>
          See all media
        </Button>
      </div>

      <Container disableGutters className={styles.sectionMediaSliderWrap}>
        <BaseSlider
          breakpoints={{
            320: {
              width: 320,
              slidesPerView: 1.1,
            },
            560: {
              width: 560,
              slidesPerView: 1.5,
            },
            992: {
              width: 992,
              slidesPerView: 2,
            },
            1200: {
              width: 1200,
              slidesPerView: 2.75,
            },
          }}
          spaceBetween={20}
          data={posts}
          renderSlide={(posts) => (
            <PostItem className={styles.sectionMediaPost} tag="div" post={posts} />
          )}
        />
      </Container>
    </SectionContainer>
  );
});

export default SectionMedia;

// const posts = [
//   {
//     description: 'Apr 19/22',
//     url: '/images/media/1.jpg',
//     date: 'Apr 19/22',
//     title: 'LiveO2 and EWOT therapy–the latest way the Smart Fit Method works for you.',
//     text: 'What would your body do with extra oxygen during exercise if it had it? Quite a lot, it turns out. With added O2, our blood… Read more',
//   },
//   {
//     description: 'Apr 19/22',
//     url: '/images/media/1.jpg',
//     date: 'Apr 19/22',
//     title: 'LiveO2 and EWOT therapy–the latest way the Smart Fit Method works for you.',
//     text: 'What would your body do with extra oxygen during exercise if it had it? Quite a lot, it turns out. With added O2, our blood… Read more',
//   },
// ];

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
