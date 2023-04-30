import React from "react";
import cx from "class-names";

import Img from "@/common/Img/Img";
import Heading from "@/common/Heading/Heading";
import Text from "@/common/Text/Text";

import styles from "./BenefitItem.module.sass";

const BenefitItem = ({ className, item }) => {
  const { icon, title, text } = item;

  return (
    <div className={cx(styles.benefitItem, className)}>
      <div className={styles.img}>
        <Img src={icon} width={48} height={48} />
      </div>
      <Heading tag="h3" size="xs" className={styles.title}>
        {title}
      </Heading>
      <Text className={styles.text}>{text}</Text>
    </div>
  );
};
export default BenefitItem;
