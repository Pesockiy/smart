import React from "react";
import cx from "class-names";

import { useOffsetTop } from "@/hooks";

import { smoothScroll } from "@/helpers";

import ArrowTopIcon from "@/assets/icons/Arrow-top.svg";

import styles from "./ScrollTop.module.sass";

const scrollOffset = 100;

const ScrollTop = () => {
  const [isVisible] = useOffsetTop(scrollOffset);

  return (
    <div
      className={cx(styles.scrollTop, {
        [styles.isVisible]: isVisible,
      })}
      onClick={smoothScroll}
    >
      Back to top{" "}
      <div className={styles.scrollTopImg}>
        <ArrowTopIcon />
      </div>
    </div>
  );
};

export default ScrollTop;
