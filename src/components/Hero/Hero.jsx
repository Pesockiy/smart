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

import VideoPoster from '../../../public/images/Video.jpg';

import styles from './Hero.module.sass';

const Hero = ({ data }) => {
  const { videosInTheSliderOnTheHomePage, richText } = data;

  const toggleModalHandler = () => setModalActive((prev) => !prev);

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node) => {
        const { nodeType, content } = node;
        const { value } = content[0];

        return (
          <Heading as={`h${nodeType[nodeType.length - 1]}`}>
            <Text as="span" gradient>
              {value}
            </Text>
          </Heading>
        );
      },
    },
  };

  const titleRichText = documentToReactComponents(richText, options);

  return (
    <section className={cx(styles.hero)}>
      <SectionContainer vCenter>
        <div className={styles.heroTextWrap}>
          <div className={styles.heroSubtitle}>
            Stop wasting time <Line inline /> <span> Get Smart Fit</span>
          </div>
          {titleRichText}

          <div className={styles.heroTextsBottom}>
            <Text>
              Our method builds strength, optimises hormones, and burns fat so we can elevate our
              clients to their maximum potential.
            </Text>
            <div className={styles.heroButtons}>
              <Button variant="primary" className={styles.heroButton}>
                Book a free workout
              </Button>
            </div>
          </div>
        </div>

        <div className={cx(styles.heroVideoWrap)}>
          <Img className={styles.heroImg} src={VideoPoster} alt="alt" width="100%" height="100%" />
          <Chip onClick={toggleModalHandler} label="Video" className={styles.heroVideoChip} />
        </div>
      </SectionContainer>
      <HeroSlider sliderData={videosInTheSliderOnTheHomePage} className={styles.heroSlider} />
    </section>
  );
};

export default Hero;
