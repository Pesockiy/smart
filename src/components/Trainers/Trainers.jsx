import React, { forwardRef, useRef } from 'react';

import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import TrainerCard from './TrainerCard';
import Animation from '@/common/Animations/Animations';

import styles from './Trainers.module.sass';

const trainersData = [
  {
    img: {
      src: '/images/trainers/trainer-1.jpg',
      alt: 'trainer',
    },
    title: 'Tyler Wood',
    social: '/dlfkmsklfm.com',
    text: 'Candidate for master of sports in water polo',
  },
  {
    img: {
      src: '/images/trainers/trainer-2.jpg',
      alt: 'trainer',
    },
    title: 'Deborah Tree',
    social: '/dlfkmsklfm.com',
    text: 'Candidate for master of sports in water polo',
  },
  {
    img: {
      src: '/images/trainers/trainer-3.jpg',
      alt: 'trainer',
    },
    title: 'Lala Land',
    social: '/dlfkmsklfm.com',
    text: 'Candidate for master of sports in water polo',
  },
  {
    img: {
      src: '/images/trainers/trainer-4.jpg',
      alt: 'trainer',
    },
    title: 'Anton Samofalov',
    social: '/dlfkmsklfm.com',
    text: 'Candidate for master of sports in water polo',
  },
  {
    img: {
      src: '/images/trainers/trainer-5.jpg',
      alt: 'trainer',
    },
    title: 'Billie Piper',
    social: '/dlfkmsklfm.com',
    text: 'Candidate for master of sports in water polo',
  },
  {
    img: {
      src: '/images/trainers/trainer-6.jpg',
      alt: 'trainer',
    },
    title: 'John Conor',
    social: '/dlfkmsklfm.com',
    text: 'Candidate for master of sports in water polo',
  },
  {
    img: {
      src: '/images/trainers/trainer-7.jpg',
      alt: 'trainer',
    },
    title: 'Alana Fox',
    social: '/dlfkmsklfm.com',
    text: 'Candidate for master of sports in water polo',
  },
  {
    img: {
      src: '/images/trainers/trainer-8.jpg',
      alt: 'trainer',
    },
    title: 'Arnold Schwarzenegger',
    social: '/dlfkmsklfm.com',
    text: 'Candidate for master of sports in water polo',
  },
];

const Trainers = forwardRef(({}, ref) => {
  const animationRefs = useRef([]);
  const pushAnimateRef = (item) => animationRefs.current.push(item);

  return (
    <SectionContainer count="03" ref={ref} subtitle={'Trainers'} className={styles.trainers}>
      <Heading ref={pushAnimateRef}>
        <Text gradient>Your Body</Text>
        Is In Safe Hands
      </Heading>

      <div className={styles.trainersContent}>
        {trainersData?.map((trainer) => (
          <Animation targets={animationRefs.current}>
            <TrainerCard
              ref={pushAnimateRef}
              trainerData={{ ...trainer, img: { ...trainer.img, width: '400', height: '100' } }}
              key={trainer.title}
            />
          </Animation>
        ))}
      </div>
    </SectionContainer>
  );
});

export default Trainers;
