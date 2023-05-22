import { useRef, forwardRef, memo, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import cx from 'class-names';

import IconArrow from '@/assets/icons/arrow.svg';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

import styles from './BaseSlider.module.sass';

const BaseSlider = forwardRef(
  ({ className, renderSlide, pagination, navigation, data, children, ...rest }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const paginationRef = useRef(null);

    const onSlideChange = useCallback((swiper) => setActiveIndex(swiper.realIndex), [activeIndex]);

    return (
      <div ref={ref} className={styles.baseSlider}>
        {data.length && navigation && (
          <div className={styles.baseSliderButtons}>
            <SliderButton disabled={activeIndex === 0} ref={navigationPrevRef}>
              <IconArrow className={styles.baseSliderArrowPrev} />
            </SliderButton>
            <SliderButton disabled={activeIndex === data?.length - 1} ref={navigationNextRef}>
              <IconArrow className={styles.baseSliderArrowNext} />
            </SliderButton>
          </div>
        )}
        {data.length && pagination && (
          <div ref={paginationRef} className={styles.baseSliderPagination} />
        )}
        <Swiper
          className={cx(styles.baseSlider, className)}
          modules={[Autoplay, Navigation, Pagination]}
          onSlideChange={onSlideChange}
          navigation={
            navigation && {
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }
          }
          pagination={pagination && { el: paginationRef.current, clickable: true }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.params.pagination.el = paginationRef.current;
          }}
          {...rest}
        >
          {data?.map((_, i) => (
            <SwiperSlide key={data?.description} className={styles.baseSlider}>
              {renderSlide({ ...data[i], index: i + 1 })}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
);

const SliderButton = memo(
  forwardRef(({ className, onClick, disabled, children }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        className={cx(
          styles.baseSliderButton,
          {
            [styles.disabled]: disabled,
          },
          className
        )}
      >
        {children}
      </button>
    );
  })
);

export default memo(BaseSlider);


