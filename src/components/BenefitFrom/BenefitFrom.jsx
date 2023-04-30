import React from "react";

import SectionContainer from "@/components/SectionContainer/SectionContainer";
import Heading from "@/common/Heading/Heading";
import Text from "@/common/Text/Text";
import Button from "@/common/Button/Button";
import BenefitItem from "@/components/BenefitItem/BenefitItem";

import { benefitItems } from "@/mock";

import styles from "./BenefitFrom.module.sass";

const BenefitFrom = ({ wrapper = false, rtl = false, vCenter = true }) => {
  return (
    <section className={styles.benefitFrom}>
      <SectionContainer
        wrapper={true}
        rtl={false}
        vCenter={vCenter}
        count="02"
        subtitle={"Advantages"}
      >
        <div className={styles.scienceTextWrap}>
          <Heading size="xl" as="h2" className={styles.scienceTitle}>
            <Text gradient={true} className={styles.scienceAccentTitle}>
              Benefit From
            </Text>{" "}
            Using Our Method
          </Heading>
          <div className={styles.benefitFromItems}>
            {benefitItems.map((item) => (
              <BenefitItem key={item.title} item={item} />
            ))}
          </div>
          <Button variant="primary" className={styles.benefitFromButton}>
            Book a free workout
          </Button>
        </div>
      </SectionContainer>
    </section>
  );
};

export default BenefitFrom;
