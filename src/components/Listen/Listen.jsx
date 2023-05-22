import { forwardRef } from 'react';

import BaseSlider from '@/components/BaseSlider/BaseSlider';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import Card from '@/common/Card/Card';
import ButtonVideo from '@/common/ButtonVideo/ButtonVideo';

import styles from './Listen.module.sass';
import Img from '@/common/Img/Img';

const Listen = forwardRef(({}, ref) => {
  return (
    <SectionContainer ref={ref} className={styles.listen}>
      <Heading as="h2" size="xl">
        <Text as="span" gradient className={styles.listenText}>
          Listen
        </Text>
        To Us On Podcasts
      </Heading>

      <BaseSlider
        pagination
        navigation
        breakpoints={{
          320: {
            width: 320,
            slidesPerView: 1.02,
          },
          768: {
            width: 768,
            slidesPerView: 1.2,
          },
          1200: {
            width: 1200,
            slidesPerView: 1.8,
          },
        }}
        spaceBetween={20}
        data={listenData}
        renderSlide={(data) => <ListenItem data={data} />}
      />
    </SectionContainer>
  );
});

export default Listen;

const ListenItem = ({ data }) => {
  const { links, avatar, description, title, text } = data;

  return (
    <div className={styles.listenItem}>
      <Img
        src={avatar}
        alt={description}
        width="180"
        height="196"
        className={styles.listenItemImg}
      />
      <div className={styles.listenItemSubtitle}>{description}</div>
      <Heading as="h6" size="xs" className={styles.listenItemTitle}>
        {title}
      </Heading>
      <Text className={styles.listenItemText}>{text}</Text>
      <div className={styles.listenItemButtons}>
        {links?.map(({ href, label }) => (
          <ButtonVideo key={label} className={styles.listenItemButton} href={href}>
            {label}
          </ButtonVideo>
        ))}
      </div>
    </div>
  );
};

const listenData = [
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
];
