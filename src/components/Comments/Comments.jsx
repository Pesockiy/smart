import { forwardRef } from 'react';
import Link from 'next/link';
import cx from 'class-names';

import BaseSlider from '@/components/BaseSlider/BaseSlider';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import UserInfo from '@/common/UserInfo/UserInfo';
import Card from '@/common/Card/Card';
import RatingView from '../Rating/Rating';
import Img from '@/common/Img/Img';

import { truncateTextByLength } from '@/helpers';

import styles from './Comments.module.sass';

const Comments = forwardRef(({}, ref) => {
  return (
    <SectionContainer ref={ref} containerClassName={styles.comments}>
      {/* <div className={styles.commentsInner}>
        <div className={styles.commentsTop}> */}
      <Heading as="h2" size="xl">
        <Text as="span" gradient className={styles.commentsText}>
          We’re Proud
        </Text>
        Of Our Customers Success
      </Heading>

      <div className={styles.commentsRating}>
        <div className={styles.commentsRatingCount}>5,0</div>
        <RatingView rating="5" />
        <div className={cx(styles.commentsRatingText, styles.top)}>38 Google review</div>
      </div>
      {/* </div> */}


      <BaseSlider
        pagination
        breakpoints={{
          320: {
            width: 320,
            slidesPerView: 1.05,
          },
          440: {
            width: 570,
            slidesPerView: 1.4,
          },
          768: {
            width: 768,
            slidesPerView: 1.6,
          },
          1200: {
            width: 1200,
            slidesPerView: 1.9,
          },
        }}
        spaceBetween={20}
        data={commentsData}
        renderSlide={(data) => <CommentsItem data={data} />}
      />
      {/* </div> */}
    </SectionContainer>
  );
});

export default Comments;

const CommentsItem = ({ data }) => {
  const { avatar, firstName, lastName, comment, rating, date } = data;

  const userInfoData = {
    texts: {
      title: `${firstName} ${lastName}`,
      as: 'h5',
      size: 'sm',
    },
    img: {
      src: avatar,
      alt: `${firstName} ${lastName}`,
      variant: 'rounded',
      size: 'md',
    },
  };

  return (
    <Card className={styles.commentsItem}>
      <div className={styles.commentsItemBody}>
        <UserInfo
          data={userInfoData}
          classNames={{
            className: styles.commentsItemAuthor,
            titleClassName: styles.commentsItemTitle,
          }}
        >
          <RatingView rating="5" />
          <span className={styles.commentsRatingText}>{date}</span>
        </UserInfo>
        <Img
          className={styles.commentItemIcon}
          src={'/images/google_logo.png'}
          alt="google"
          width="24"
          height="24"
        />
        <div className={styles.commentsItemText}>
          {truncateTextByLength({ text: comment, length: 40 })} <Link href="#">Read more</Link>
        </div>
      </div>
    </Card>
  );
};

const commentsData = [
  {
    firstName: 'Melinda',
    lastName: 'Willett',
    rating: 5,
    date: '4 months ago',
    avatar: '/images/comments/1.jpg',
    comment:
      'This is a gym without the grunting and noise.  There are basically three different pieces of equipment and after using each for 20 minutes once a week you are done for the week.  There is lots of science behind the equipment but I don’t understand it, so I’ll leave that to  ',
  },
  {
    firstName: 'Melinda',
    lastName: 'Willett',
    rating: 5,
    date: '4 months ago',
    avatar: '/images/comments/2.jpg',
    comment:
      'This is a gym without the grunting and noise.  There are basically three different pieces of equipment and after using each for 20 minutes once a week you are done for the week.  There is lots of science behind the equipment but I don’t understand it, so I’ll leave that to  ',
  },
  {
    firstName: 'Melinda',
    lastName: 'Willett',
    rating: 5,
    date: '4 months ago',
    avatar: '/images/comments/3.jpg',
    comment:
      'This is a gym without the grunting and noise.  There are basically three different pieces of equipment and after using each for 20 minutes once a week you are done for the week.  There is lots of science behind the equipment but I don’t understand it, so I’ll leave that to  ',
  },
  {
    firstName: 'Melinda',
    lastName: 'Willett',
    rating: 5,
    date: '4 months ago',
    avatar: '/images/comments/1.jpg',
    comment:
      'This is a gym without the grunting and noise.  There are basically three different pieces of equipment and after using each for 20 minutes once a week you are done for the week.  There is lots of science behind the equipment but I don’t understand it, so I’ll leave that to  ',
  },
  {
    firstName: 'Melinda',
    lastName: 'Willett',
    rating: 5,
    date: '4 months ago',
    avatar: '/images/comments/2.jpg',
    comment:
      'This is a gym without the grunting and noise.  There are basically three different pieces of equipment and after using each for 20 minutes once a week you are done for the week.  There is lots of science behind the equipment but I don’t understand it, so I’ll leave that to  ',
  },
  {
    firstName: 'Melinda',
    lastName: 'Willett',
    rating: 5,
    date: '4 months ago',
    avatar: '/images/comments/3.jpg',
    comment:
      'This is a gym without the grunting and noise.  There are basically three different pieces of equipment and after using each for 20 minutes once a week you are done for the week.  There is lots of science behind the equipment but I don’t understand it, so I’ll leave that to  ',
  },
];
