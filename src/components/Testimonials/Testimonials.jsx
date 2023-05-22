import { forwardRef } from 'react';
import cx from 'class-names';

import BaseSlider from '@/components/BaseSlider/BaseSlider';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import GradientWrapper from '@/common/GradientWrapper/GradientWrapper';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import Card from '@/common/Card/Card';
import UserInfo from '@/common/UserInfo/UserInfo';

import styles from './Testimonials.module.sass';

const Testimonials = forwardRef(({}, ref) => {
  return (
    <SectionContainer ref={ref} className={styles.testimonials}>
      <Heading as="h2" size="xl">
        <Text as="span" gradient className={styles.testimonialsText}>
          Join The League
        </Text>
        Of Extraordinary Body
      </Heading>

      <GradientWrapper className={styles.testimonialWrapper}>
        <BaseSlider
          pagination
          navigation
          breakpoints={{
            320: {
              width: 320,
              spaceBetween: 10,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              spaceBetween: 20,
              slidesPerView: 1,
            },
            1200: {
              width: 1200,
              spaceBetween: 40,
              slidesPerView: 1.23,
            },
          }}
          centeredSlides={true}
          centerInsufficientSlides={true}
          data={testimonialsData}
          renderSlide={(data) => <TestimonialItem data={data} />}
        />
      </GradientWrapper>
    </SectionContainer>
  );
});

export default Testimonials;

const TestimonialItem = ({ data }) => {
  const { avatar, firstName, lastName, description, about, info } = data;
  const { img, details } = info;

  const imageOptions = {
    src: img.url,
    alt: details.joined,
    width: 200,
    height: 200,
    imgClassName: styles.testimonialItemImage,
    quality: 80
  };

  const userInfoData = {
    texts: {
      title: `${firstName} ${lastName}`,
      as: 'h5',
      size: 'xs',
    },
    img: {
      src: avatar,
      alt: `${firstName} ${lastName}`,
      variant: 'rounded',
      size: 'md',
    },
  };

  return (
    <Card img={imageOptions} className={styles.testimonialItem}>
      <div className={styles.testimonialItemBody}>
        <UserInfo data={userInfoData} classNames={{ className: styles.testimonialItemInfo }}>
          <Text className={cx(styles.infoText)}>{description}</Text>
        </UserInfo>
        <div className={styles.testimonialAbout}>{about}</div>
        <div className={styles.infoBlock}>
          {details?.map((datail) => (
            <div key={Object.values(datail)[0]} className={styles.infoItem}>
              <div className={styles.infoItemTitle}>{Object.keys(datail)[0]}</div>
              <div className={styles.infoItemText}>{Object.values(datail)[0]}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

const testimonialsData = [
  {
    firstName: 'Tony',
    lastName: 'Robbins',
    avatar: '/images/testimonials/avatar.png',
    description: '73 yr. old man',
    about:
      '«I’ve been training for a half marathon and since adding the CAROL to my daily routine the past 2 weeks my VO2max has gone up 5% already».',
    info: {
      img: {
        url: '/images/testimonials/1.png',
      },
      details: [
        {
          joined: 'October 2021',
        },
        {
          goal: 'Overall Fitness',
        },
        {
          wins: 'I dropped my weight by 2.6 lbs, my body fat by 3,3% and increased my lean mass by 3.5 lbs at wks and 4.9lbs after 12 weeks.',
        },
      ],
    },
  },
  {
    firstName: 'Tony',
    lastName: 'Robbins',
    avatar: '/images/testimonials/avatar.png',
    description: '73 yr. old man',
    about:
      '«I’ve been training for a half marathon and since adding the CAROL to my daily routine the past 2 weeks my VO2max has gone up 5% already».',
    info: {
      img: {
        url: '/images/testimonials/1.png',
      },
      details: [
        {
          joined: 'October 2021',
        },
        {
          goal: 'Overall Fitness',
        },
        {
          wins: 'I dropped my weight by 2.6 lbs, my body fat by 3,3% and increased my lean mass by 3.5 lbs at wks and 4.9lbs after 12 weeks.',
        },
      ],
    },
  },
  {
    firstName: 'Tony',
    lastName: 'Robbins',
    avatar: '/images/testimonials/avatar.png',
    description: '73 yr. old man',
    about:
      '«I’ve been training for a half marathon and since adding the CAROL to my daily routine the past 2 weeks my VO2max has gone up 5% already».',
    info: {
      img: {
        url: '/images/testimonials/1.png',
      },
      details: [
        {
          joined: 'October 2021',
        },
        {
          goal: 'Overall Fitness',
        },
        {
          wins: 'I dropped my weight by 2.6 lbs, my body fat by 3,3% and increased my lean mass by 3.5 lbs at wks and 4.9lbs after 12 weeks.',
        },
      ],
    },
  },
];
