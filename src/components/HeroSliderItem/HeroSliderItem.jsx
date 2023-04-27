import React, { useRef } from "react";
import cx from "class-names";
import { useSwiper, useSwiperSlide } from "swiper/react";

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

  return (
    <div className={classes}>
      <div className={heroSliderVideoWrap}>
        <Video
          ref={playerRef}
          play={swiperSlide.isActive}
          onEnd={() => swiper.slideNext()}
          onClick={() => swiper.slideTo(index - 1)}
          params={{
            autoplay: true,
            muted: true,
            src: `/${index}.mov`,
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
