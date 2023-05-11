import React, { forwardRef } from "react";

import Heading from "@/common/Heading/Heading";
import Text from "@/common/Text/Text";
import SectionContainer from "@/components/SectionContainer/SectionContainer";

import styles from "./ScienceBased.module.sass";

const ScienceBased = forwardRef(({}, ref) => {
  return (
    <section ref={ref} className={styles.scienceBased}>
      <SectionContainer wrapper vCenter count="01" subtitle={"About"}>
        <div className={styles.scienceTextWrap}>
          <Heading size="xl" as="h2" className={styles.scienceTitle}>
            <Text as="span" gradient className={styles.scienceAccentTitle}>
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
      </SectionContainer>
    </section>
  );
});

export default ScienceBased;
