import { forwardRef, memo, useRef } from 'react';
import cx from 'class-names';

import Img from '@/common/Img/Img';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import Container from '@/common/Container/Container';
import Animation from '@/common/Animations/Animations';
import AppMarketButtons from '@/common/AppMarketButtons/AppMarketButtons';

import styles from './SmartfitApp.module.sass';

const SmartfitAppData = {
  title: 'The Smart Fit Method App',
  texts: [
    'Track your progress, see precisely where improvements are made and which goals you achieved, just set your goals.',
  ],
  images: [
    [
      {
        alt: 'dsdsd',
        url: '/images/smartfit-app/screen-1.png',
      },
      {
        alt: 'dsdsd',
        url: '/images/smartfit-app/screen-2.png',
      },
      {
        alt: 'dsdsd',
        url: '/images/smartfit-app/screen-1.png',
      },
    ],
    [
      {
        alt: 'dsdsd',
        url: '/images/smartfit-app/screen-1.png',
      },
      {
        alt: 'dsdsd',
        url: '/images/smartfit-app/screen-4.png',
      },
      {
        alt: 'dsdsd',
        url: '/images/smartfit-app/screen-1.png',
      },
    ],
    [
      {
        url: '/images/smartfit-app/screen-6.png',
        alt: 'dfklsfjk',
      },
    ],
    [
      {
        alt: 'dsdsd',
        url: '/images/smartfit-app/screen-1.png',
      },
      {
        alt: 'dsdsd',
        url: '/images/smartfit-app/screen-4.png',
      },
      {
        alt: 'dsdsd',
        url: '/images/smartfit-app/screen-1.png',
      },
    ],
    [
      {
        alt: 'dsdsd',
        url: '/images/smartfit-app/screen-2.png',
      },
      {
        alt: 'dsdsd',
        url: '/images/smartfit-app/screen-1.png',
      },
      {
        alt: 'dsdsd',
        url: '/images/smartfit-app/screen-2.png',
      },
    ],
  ],
};

const SmartfitApp = forwardRef(({ data = SmartfitAppData }, ref) => {
  const { title, texts, images } = data;

  const firstAnimationRefs = useRef([]);
  const secondAnimationRef = useRef([]);
  const thirdAnimationRefs = useRef([]);

  const SmartFitImages = memo(() => {
    const halfImgsCount = Math.floor(images.length / 2);

    const firstAnimation = (item) => firstAnimationRefs.current.push(item);
    const secondAnimation = (item) => thirdAnimationRefs.current.push(item);

    return images?.map((item, i, arr) => {
      if (halfImgsCount === i) {
        return (
          <Animation duration={4} startY={-200} targets={secondAnimationRef.current}>
            <Img
              ref={(item) => secondAnimationRef.current.unshift(item)}
              src={arr[i][0].url}
              alt={arr[i][0].alt}
              width="200"
              height="400"
              className={styles.smartfitAppAccentImg}
            />
          </Animation>
        );
      } else {
        return (
          <Animation
            duration={i % 2 === 0 ? 2 : 3}
            startY={500}
            targets={i % 2 === 0 ? firstAnimationRefs.current : thirdAnimationRefs.current}
          >
            <div
              ref={i % 2 === 0 ? firstAnimation : secondAnimation}
              className={styles.smartfitAppCol}
            >
              {item.map(({ url, alt }) => (
                <Img
                  key={url}
                  src={url}
                  alt={alt}
                  width="200"
                  height="400"
                  quality={80}
                  className={styles.smartfitAppImg}
                />
              ))}
            </div>
          </Animation>
        );
      }
    });
  });

  return (
    <Container ref={ref} className={styles.smartfitApp}>
      <div className={styles.smartfitAppInner}>
        {title && (
          <Heading size="xl" as="h2" className={styles.smartfitAppTitle}>
            <Text gradient>{title}</Text>
          </Heading>
        )}
        {texts?.map((text) => (
          <Text key={text} className={styles.smartfitAppTexts}>
            {text}
          </Text>
        ))}
        <div className={styles.smartfitAppButtons}>
          <AppMarketButtons />
        </div>

        <div className={styles.smartfitAppContent}>
          <SmartFitImages />
        </div>
      </div>
    </Container>
  );
});

export default SmartfitApp;
