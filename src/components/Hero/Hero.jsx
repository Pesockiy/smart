import { memo, useCallback, useRef } from 'react';
import cx from 'class-names';

import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import Img from '@/common/Img/Img';
import Button from '@/common/Button/Button';
import Line from '@/common/Line/Line';
import Chip from '@/common/Chip/Chip';
import HeroSlider from '@/components/HeroSlider/HeroSlider';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Animation from '@/common/Animations/Animations';

import VideoPoster from '../../../public/images/Video.jpg';

import styles from './Hero.module.sass';

const Hero = ({ data }) => {
  const { videosInTheSliderOnTheHomePage, richText } = data;
  const itemsRefs = useRef([]);

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

  return (
    <section className={cx(styles.hero)}>
      <SectionContainer vCenter>
        <Animation
          toggleActions={''}
          duration={0.4}
          startY={50}
          stagger={0.1}
          targets={itemsRefs.current}
        >
          <div className={styles.heroTextWrap}>
            <div ref={pushAnimateRef} className={styles.heroSubtitle}>
              Stop wasting time <Line inline /> <span> Get Smart Fit</span>
            </div>
            <TitleRichText />

            <div className={styles.heroTextsBottom}>
              <Text ref={pushAnimateRef}>
                Our method builds strength, optimises hormones, and burns fat so we can elevate our
                clients to their maximum potential.
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
              ref={(item) => itemsRefs.current.unshift(item)}
              className={styles.heroImg}
              src={VideoPoster}
              alt="alt"
              width="100%"
              height="100%"
            />
            <Chip
              ref={pushAnimateRef}
              onClick={toggleModalHandler}
              label="Video"
              className={styles.heroVideoChip}
            />
          </div>
        </Animation>
      </SectionContainer>
      <HeroSlider sliderData={videosInTheSliderOnTheHomePage} className={styles.heroSlider} />
    </section>
  );
};

export default Hero;
