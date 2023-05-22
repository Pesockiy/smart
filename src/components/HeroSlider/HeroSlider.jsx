import { useRef, useCallback } from 'react';
import cx from 'class-names';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Virtual } from 'swiper';

import 'swiper/css/navigation';
import 'swiper/css';

import HeroSliderItem from '@/components/HeroSliderItem/HeroSliderItem';
import Animation from '@/common/Animations/Animations';

import styles from './HeroSlider.module.sass';

const HeroSlider = ({ sliderData, className }) => {
  const itemRefs = useRef([]);

  const addAnimation = useCallback((item) => itemRefs.current.push(item), []);

  return (
    <>
      <Swiper
        modules={[Autoplay, Navigation, Virtual]}
        spaceBetween={10}
        className={cx(styles.heroSlider, className)}
        loop
        breakpoints={{
          320: {
            width: 320,
            slidesPerView: 1.2,
          },
          570: {
            width: 570,
            slidesPerView: 2,
          },
          768: {
            width: 768,
            slidesPerView: 3,
          },
          1200: {
            width: 1200,
            slidesPerView: 3.75,
          },
        }}
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={slide.fields.file.url} className={styles.heroSlideS}>
            <Animation
              duration={0.2}
              stagger={-0.05}
              startX={'+=100%'}
              targets={itemRefs.current}
              toX
            >
              <HeroSliderItem
                ref={addAnimation}
                slideData={slide}
                index={index + 1}
                className={styles.heroSlide}
              />
            </Animation>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroSlider;
