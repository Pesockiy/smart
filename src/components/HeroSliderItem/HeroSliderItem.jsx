import React, { useRef } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import cx from "class-names";

import Heading from "@/common/Heading/Heading";
import Video from "@/common/Video/Video";

import styles from "./HeroSliderItem.module.sass";

const {
  heroSliderItem,
  heroSliderVideoWrap,
  heroSliderVideo,
  heroSliderTextWrap,
  heroSliderNumberSlide,
  heroSliderHeading,
  heroVideoButton,
} = styles;

const HeroSliderItem = ({
  slideData,
  index,
  className,
  onClick = () => {},
}) => {
  const { title } = slideData;
  const swiper = useSwiper();

  const swiperSlide = useSwiperSlide();
  const playerRef = useRef(null);

  const classes = cx(
    heroSliderItem,
    {
      [styles.isActive]: swiperSlide.isActive,
    },
    className
  );

  const slideNextHandler = () => {
    swiper.slideNext();
  };

  return (
    <div className={classes}>
      <div className={heroSliderVideoWrap}>
        <Video
          className={heroSliderVideo}
          buttonClassName={heroVideoButton}
          ref={playerRef}
          showButtons={true}
          play={swiperSlide.isActive}
          progressBar={swiperSlide.isActive}
          onEnd={slideNextHandler}
          onClick={() => {
            swiper.slideTo(index - 1);
            swiper.updateSlides();
          }}
          params={{
            muted: true,
            src: `/videos/${index}.mp4`,
          }}
        />
      </div>
      <div className={heroSliderTextWrap}>
        <div className={heroSliderNumberSlide}>/{index}</div>
        <Heading size="sm" className={heroSliderHeading}>
          {title}
        </Heading>
      </div>
    </div>
  );
};

export default HeroSliderItem;
