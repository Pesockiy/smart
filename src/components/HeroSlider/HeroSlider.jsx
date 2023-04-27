import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Virtual  } from "swiper";

import cx from "class-names";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./HeroSlider.module.sass";

const { navButtonPrev, navButtonNext } = styles;

import HeroSliderItem from "../HeroSliderItem/HeroSliderItem";

const HeroSlider = ({ sliderData, className }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <>
      <Swiper
        modules={[Autoplay, Navigation, Virtual ]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onInit={(swiper) => {
          setTimeout(() => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
        // centeredSlides
        // centeredSlidesBounds
        spaceBetween={10}
        slidesPerView={5.75}
        // slidesPerGroup={4}
        // autoplay={true}
        // autoplay={{
        //   delay: 3000,
        //   pauseOnMouseEnter: true,
        //   disableOnInteraction: false,
        // }}
        setWrapperSize={true}
        // width="1800"
        loopFillGroupWithBlank={true}
        centerInsufficientSlides={true}
        className={cx(styles.heroSlider, className)}
        loop
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={Date.now().toLocaleString() + index}  className={styles.heroSlideS}>
            {/* {children} */}
            <HeroSliderItem slideData={slide} index={index + 1}  className={styles.heroSlide}/>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div ref={navigationPrevRef} className={navButtonPrev} />
      <div ref={navigationNextRef} className={navButtonNext} /> */}
    </>
  );
};

export default HeroSlider;
