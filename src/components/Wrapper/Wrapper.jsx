import React, { useState, useRef, useEffect } from "react";
import cx from "class-names";

import Container from "@/common/Container/Container";
import Line from "@/common/Line/Line";
import Portal from "../Portal/Portal";

import styles from "./Wrapper.module.sass";

const Wrapper = ({
  wrapper = false,
  topText = "Scroll",
  count = "02",
  children = null,
  className = "",
  subtitle = "Why Smart Fit",
}) => {
  const classes = cx(styles.wrapper, className, {
    [styles.wrapperLeftOffset]: wrapper,
    [styles.wrapperInner]: wrapper,
  });

  const [isSideTextVisible, setIsSideTextVisible] = useState(true);
  const ref = useRef(null);

  return (
    <Container className={classes} fixed ref={ref}>
      {wrapper && topText && (
        <>
          <div className={styles.wrapperSideBlock}>
            <span>/{count}</span>
            {isSideTextVisible && (
              <Portal>
                <div className={styles.wrapperSideText}>
                  {topText} <Line inline className={styles.wrapperSideLine} />
                </div>
              </Portal>
            )}
          </div>
          <Container className={styles.wrapperTopBlock}>
            <div>{`/ ${subtitle}`}</div>
          </Container>
        </>
      )}
      <div className={styles.wrapperContent}>{children}</div>
    </Container>
  );
};
export default Wrapper;
