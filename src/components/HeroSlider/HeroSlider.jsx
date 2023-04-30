import cx from "class-names";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Virtual } from "swiper";

import "swiper/css/navigation";
import "swiper/css";

import HeroSliderItem from "@/components/HeroSliderItem/HeroSliderItem";

import styles from "./HeroSlider.module.sass";

const HeroSlider = ({ sliderData, className }) => {
  return (
    <>
      <Swiper
        modules={[Autoplay, Navigation, Virtual]}
        spaceBetween={10}
        slidesPerView={5.75}
        className={cx(styles.heroSlider, className)}
        loop
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide
            key={Date.now().toLocaleString() + index}
            className={styles.heroSlideS}
          >
            <HeroSliderItem
              slideData={slide}
              index={index + 1}
              className={styles.heroSlide}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroSlider;
