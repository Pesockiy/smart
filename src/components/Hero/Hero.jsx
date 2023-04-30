import React, { forwardRef, useRef, useState, useEffect } from "react";
import cx from "class-names";

import { useToggle } from "@/hooks";

import Heading from "@/common/Heading/Heading";
import Text from "@/common/Text/Text";
import Img from "@/common/Img/Img";
import Button from "@/common/Button/Button";
import ButtonVideo from "@/common/ButtonVideo/ButtonVideo";
import Line from "@/common/Line/Line";
import Chip from "@/common/Chip/Chip";
import Video from "@/common/Video/Video";
import Modal from "@/common/Modal/Modal";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import SectionContainer from "@/components/SectionContainer/SectionContainer";

import { slides } from "@/mock";

import VideoPoster from "../../../public/images/Video.jpg";

import styles from "./Hero.module.sass";

const Hero = () => {
  const toggleModalHandler = () => setModalActive((prev) => !prev);

  return (
    <section className={cx(styles.hero)}>
      <SectionContainer
        wrapper={false}
        rtl={false}
        vCenter={true}
        count="01"
        subtitle={"Stop wasting time "}
      >
        <div className={styles.heroTextWrap}>
          <div className={styles.heroSubtitle}>
            Stop wasting time <Line inline /> <span> Get Smart Fit</span>
          </div>
          <Heading size="xxl" className={styles.heroTitle}>
            Personal Training{" "}
            <Text as="span" gradient={true}>
              For 20 Minutes
            </Text>{" "}
            Three Times a Week
          </Heading>
          <div className={styles.heroTextsBottom}>
            <Text>
              Our method builds strength, optimises hormones, and burns fat so
              we can elevate our clients to their maximum potential.
            </Text>
            <div className={styles.heroButtons}>
              <Button className={styles.heroButton} variant="primary" outlined>
                Book a free workout
              </Button>
              <Button variant="primary" className={styles.heroButton}>
                Book a free workout
              </Button>
              <ButtonVideo>sfsd</ButtonVideo>
            </div>
          </div>
        </div>

        <div className={cx(styles.heroVideoWrap)}>
          <Img
            className={styles.heroImg}
            src={VideoPoster}
            alt="alt"
            width="100%"
            height="100%"
          />
          <Chip
            onClick={toggleModalHandler}
            label="Video"
            className={styles.heroVideoChip}
          />
        </div>
      </SectionContainer>
      <HeroSlider sliderData={slides} className={styles.heroSlider} />
    </section>
  );
};

export default Hero;
