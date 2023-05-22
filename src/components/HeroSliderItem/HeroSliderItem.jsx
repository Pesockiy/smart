import { forwardRef, useCallback, memo } from 'react';
import { useSwiper, useSwiperSlide } from 'swiper/react';
import cx from 'class-names';

import Heading from '@/common/Heading/Heading';
import Video from '@/common/Video/Video';

import styles from './HeroSliderItem.module.sass';

const {
  heroSliderItem,
  heroSliderVideoWrap,
  heroSliderVideo,
  heroSliderTextWrap,
  heroSliderNumberSlide,
  heroSliderHeading,
  heroVideoButton,
} = styles;

const HeroSliderItem = forwardRef(({ data, className }, ref) => {
  const { index } = data;

  const swiper = useSwiper();

  const swiperSlide = useSwiperSlide();

  const classes = cx(
    heroSliderItem,
    {
      [styles.isActive]: swiperSlide.isActive,
    },
    className
  );

  const slideNextHandler = useCallback(() => {
    swiper.slideNext();
  }, [swiperSlide]);

  const videoNextHandler = useCallback(() => {
    swiper.slideTo(index - 1);
    swiper.updateSlides();
  }, [swiperSlide]);

  return (
    <>
      <div ref={ref} className={classes}>
        <div className={heroSliderVideoWrap}>
          <Video
            showButtons
            play={swiperSlide.isActive}
            onEnd={slideNextHandler}
            onClick={videoNextHandler}
            className={heroSliderVideo}
            buttonClassName={heroVideoButton}
            progressBar={swiperSlide.isActive}
            params={{
              muted: true,
              src: data?.fields.file?.url,
            }}
          />
        </div>
        <div className={heroSliderTextWrap}>
          {index && <div className={heroSliderNumberSlide}>/{index}</div>}
          <Heading size="sm" className={heroSliderHeading}>
            {data?.fields.description}
          </Heading>
        </div>
      </div>
    </>
  );
});

export default memo(HeroSliderItem);
