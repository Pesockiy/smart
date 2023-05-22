import { memo, useCallback, useRef, forwardRef, useMemo } from 'react';
import cx from 'class-names';

import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import Img from '@/common/Img/Img';
import Button from '@/common/Button/Button';
import Line from '@/common/Line/Line';
import Chip from '@/common/Chip/Chip';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Animation from '@/common/Animations/Animations';
import BaseSlider from '@/components/BaseSlider/BaseSlider';

import VideoPoster from '../../../public/images/Video.jpg';

import styles from './Hero.module.sass';
import styles2 from '../HeroSliderItem/HeroSliderItem.module.sass';

import HeroSliderItem from '@/components/HeroSliderItem/HeroSliderItem';

const Hero = forwardRef(({ data, slideType, withSlder = true }, ref) => {
  const { videosInTheSliderOnTheHomePage, richText } = data;
  const itemsRefs = useRef([]);
  const sliderItemsRefs = useRef([]);

  // its an experiment with rich text from contentful.
  // it will have moved to its own component soon...
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node) => {
        const { nodeType, content } = node;
        const { value } = content[0];

        return (
          <Heading ref={pushAnimateRef} as={`h${nodeType[nodeType.length - 1]}`}>
            <Text as="span" gradient>
              {value}
            </Text>
          </Heading>
        );
      },
    },
  };

  const TitleRichText = memo(() => documentToReactComponents(richText, options));

  const toggleModalHandler = useCallback(() => setModalActive((prev) => !prev), []);

  const pushAnimateRef = (item) => itemsRefs.current.push(item);
  const pushAnimateSliderRef = (item) => sliderItemsRefs.current.push(item);

  // there are three variants of the slider in the hero pages in the design.
  const SlideItemVariant = useMemo(
    () => (data) => {
      if (slideType == 1) {
        return <HeroSliderItem data={data} ref={pushAnimateSliderRef}/>;
      } else if (slideType == 2) {
        return <SlideVariant2 data={data} />;
      } else {
        return <SlideVariant3 data={data} />;
      }
    },
    [itemsRefs.current]
  );

  return (
    <>
      <SectionContainer ref={ref} verticalCenter className={cx(styles.hero)}>
        <Animation duration={0.4} startY={50} stagger={0.1} targets={itemsRefs.current}>
          <Animation
            duration={0.1}
            stagger={0.1}
            toX
            startX={100}
            scrub={1}
            targets={sliderItemsRefs.current}
          >
            <div className={styles.heroTextWrap}>
              <div ref={pushAnimateRef} className={styles.heroSubtitle}>
                Stop wasting time <Line inline /> <span> Get Smart Fit</span>
              </div>

              {/* <TitleRichText /> */}
              <Heading ref={pushAnimateRef} as="h1">
                Personal Training
                <Text as="span" className={styles.heroTitleText} gradient>
                  For 20 Minutes
                </Text>
                Three Times a Week
              </Heading>

              <div className={styles.heroTextsBottom}>
                <Text ref={pushAnimateRef}>
                  Our method builds strength, optimises hormones, and burns fat so we can elevate
                  our clients to their maximum potential.
                </Text>
                <div className={styles.heroButtons}>
                  <Button ref={pushAnimateRef} variant="primary" className={styles.heroButton}>
                    Book a free workout
                  </Button>
                </div>
              </div>
            </div>

            <div className={cx(styles.heroVideoWrap)}>
              <Img
                ref={pushAnimateRef}
                className={styles.heroImg}
                src={VideoPoster}
                alt="alt"
                width="100%"
                height="100%"
              />
              <Chip
                ref={pushAnimateRef}
                label="Video"
                onClick={toggleModalHandler}
                className={styles.heroVideoChip}
              />
            </div>
          </Animation>
        </Animation>
      </SectionContainer>

      {withSlder && (
        <BaseSlider
          className={cx(styles2.heroSlider, styles.heroSlider)}
          spaceBetween={20}
          freeMode
          breakpoints={{
            320: {
              width: 320,
              slidesPerView: 1.05,
              spaceBetween: 16,
            },
            570: {
              width: 570,
              slidesPerView: 1.8,
            },
            768: {
              width: 768,
              slidesPerView: 2.4,
            },
            1200: {
              width: 1200,
              slidesPerView: 3.65,
            },
          }}
          data={videosInTheSliderOnTheHomePage}
          renderSlide={SlideItemVariant}
        />
      )}
    </>
  );
});

export default Hero;
