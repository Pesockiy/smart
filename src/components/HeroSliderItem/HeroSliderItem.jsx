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
          showButtons
          className={heroSliderVideo}
          buttonClassName={heroVideoButton}
          ref={playerRef}
          play={swiperSlide.isActive}
          progressBar={swiperSlide.isActive}
          onEnd={slideNextHandler}
          onClick={() => {
            swiper.slideTo(index - 1);
            swiper.updateSlides();
          }}
          params={{
            muted: true,
            src: slideData.fields.file.url,
          }}
        />
      </div>
      <div className={heroSliderTextWrap}>
        <div className={heroSliderNumberSlide}>/{index}</div>
        <Heading size="sm" className={heroSliderHeading}>
          {slideData.fields?.description}
        </Heading>
      </div>
    </div>
  );
};

export default HeroSliderItem;
