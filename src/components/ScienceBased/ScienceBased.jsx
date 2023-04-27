import React, {forwardRef} from "react";
import cx from "class-names";

import DotsIcon from "@/assets/icons/dots.svg";
import VectorIcon from "@/assets/icons/vector.svg";

import styles from "./ScienceBased.module.sass";

const { scienceBased, scienceBasedSvgDots } = styles;

const ScienceBased = forwardRef(({}, ref) => {
  return (
    <section ref={ref} className={scienceBased}>
      <h1>fklnrkjg</h1>
      <div className={cx("container", )}>
        <DotsIcon className={scienceBasedSvgDots}/>
        <VectorIcon className={scienceBasedSvgDots}/>
      </div>
    </section>
  );
});

export default ScienceBased;
