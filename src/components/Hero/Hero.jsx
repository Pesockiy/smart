import React, { useRef, forwardRef } from "react";
import cx from "class-names";

// import VideoPoster from "../../../public/images/Video.jpg";

import styles from "./Hero.module.sass";

import Heading from "@/common/Heading/Heading";
import Text from "@/common/Text/Text";
import Img from "@/common/Img/Img";
import Container from "@/common/Container/Container";
import Button from "@/common/Button/Button";
import Line from "@/common/Line/Line";
import Chip from "@/common/Chip/Chip";
import Video from "@/common/Video/Video";
import Modal from "@/common/Modal/Modal";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import Wrapper from "@/components/Wrapper/Wrapper";
import { Icon } from "@/common/Icon/Icon";

import { useToggle } from "@/hooks";

const {
  hero,
  heroTop,
  heroTextWrap,
  heroVideoWrap,
  heroSlider,
  heroImg,
  heroTitle,
  heroButtons,
  heroVideoChip,
  heroSubtitle,
  heroTextsBottom,
  heroAccentTitle,
  heroButton,
  heroTopBlock,
  heroWrap,
  heroSideBlock,
  heroSideText,
  heroVideoWrapBig,
} = styles;

const slides = [
  { title: "Smart Strength" },
  { title: "Smart Re-HIIT" },
  { title: "Smart Cold HIIT" },
  { title: "Smart Charge" },
  { title: "Smart Charge" },
  { title: "Smart Charge" },
  { title: "Smart Charge" },
  { title: "Smart Charge" },
  { title: "Smart Charge" },
  { title: "Smart Charge" },
  { title: "Smart Charge" },
  { title: "Smart Charge" },
];

const Hero = forwardRef(
  (
    {
      wrapper,
      slider = false,
      rtl = false,
      verticalCenter = true,
      bigMedia = false,
    },
    ref
  ) => {
    const [isVideo, toggleVideo] = useToggle(false);
    const playerRef = useRef(null);

    return (
      <section className={hero} ref={ref}>
        <Wrapper
          wrapper={wrapper}
          className={heroWrap}
          // component="section"
        >
          <Icon icon="Play"/>
          <Container
            disableGutters={wrapper}
            className={heroTop}
            style={{
              flexDirection: rtl ? "row-reverse" : "row",
              alignItems: verticalCenter ? "center" : "flex-start",
            }}
          >
            <div
              className={heroTextWrap}
              style={{ gap: verticalCenter && "40px" }}
            >
              <div className={heroSubtitle}>
                Stop wasting time <Line inline /> <span> Get Smart Fit</span>
              </div>
              <Heading size="xxl" className={heroTitle}>
                Personal Training{" "}
                <Text as="span" gradient={true} className={heroAccentTitle}>
                  For 20 Minutes
                </Text>{" "}
                Three Times a Week
              </Heading>
              <div className={heroTextsBottom}>
                <Text>
                  Our method builds strength, optimises hormones, and burns fat
                  so we can elevate our clients to their maximum potential.
                </Text>
                <div className={heroButtons}>
                  <Button outlined variant="primary" className={heroButton}>
                    Book a free workout
                  </Button>
                  <Button variant="primary" className={heroButton}>
                    Book a free workout
                  </Button>
                </div>
              </div>
            </div>
            <div
              className={cx(heroVideoWrap, { [heroVideoWrapBig]: bigMedia })}
              style={{ justifyContent: rtl ? "start" : "end" }}
            >
              {/* <Img
                className={heroImg}
                src={VideoPoster}
                alt="alt"
                width="100%"
                height="100%"
              /> */}
              <Chip
                onClick={toggleVideo}
                label="Video"
                className={heroVideoChip}
              />
            </div>
          </Container>

          {isVideo && (
            <Modal center>
              <Video
                ref={playerRef}
                play={true}
                params={{
                  controls: "controls",
                  autoplay: true,
                  loop: true,
                  muted: true,
                  src: "/1.mp4",
                }}
              />
            </Modal>
          )}
        </Wrapper>
        {slider && <HeroSlider sliderData={slides} className={heroSlider} />}
      </section>
    );
  }
);

export default Hero;
