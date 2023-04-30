import React, { forwardRef } from "react";
import cx from "class-names";

import Heading from "@/common/Heading/Heading";
import Text from "@/common/Text/Text";
import SectionContainer from "@/components/SectionContainer/SectionContainer";

// import DotsIcon from "../../../public/patterns/dots.png";
// import VectorIcon from "../../../public/patterns/radial.png";
// import DotsIcon from "@/assets/icons/dots.svg";
// import VectorIcon from "@/assets/icons/vector.svg";

import styles from "./ScienceBased.module.sass";

const ScienceBased = forwardRef(({}, ref) => {
  return (
    <section ref={ref} className={styles.scienceBased}>
      <SectionContainer
        wrapper={true}
        rtl={false}
        vCenter={true}
        count="01"
        subtitle={"About"}
      >
        <div className={styles.scienceTextWrap}>
          <Heading size="xl" as="h2" className={styles.scienceTitle}>
            <Text
              as="span"
              gradient={true}
              className={styles.scienceAccentTitle}
            >
              Science-Based
            </Text>{" "}
            Fitness
          </Heading>
          <div className={styles.scienceTextsBottom}>
            <Text>
              It combines exercise robotics and Artificial Intelligence for a
              perfect, personalized training session. No plateaus. Just
              progress.
            </Text>
            <Text>
              It only takes one 20-minute session on each device per week. Get
              outstanding results in just one hour a week.
            </Text>
          </div>
        </div>

        {/* <div
            className={section.scienceBasedBg}
            style={{
              background: `radial-gradient(49.43% 50% at 50% 50%, rgba(20, 20, 23, 0) 62.52%, #141417 93.88%) no-repeat center / 50% fixed, url(${VectorIcon.src}) no-repeat center / cover fixed, url(${DotsIcon.src}) repeat center / cover fixed`,
              backgroundClip: "content-box",
              backgroundOrigin: "content-box",
            }}
          ></div> */}
      </SectionContainer>
    </section>
  );
});

export default ScienceBased;
