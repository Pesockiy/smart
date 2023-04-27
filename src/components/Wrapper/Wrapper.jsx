import React from "react";
import cx from "class-names";

import Container from "@/common/Container/Container";
import Line from "@/common/Line/Line";

import styles from "./Wrapper.module.sass";

const Wrapper = ({
  wrapper = false,
  topText = "Scroll",
  count = "02",
  left,
  children,
  className,
}) => {
  const classes = cx(styles.wrapper, className, {
    [styles.wrapperLeftOffset]: wrapper,
    [styles.wrapperInner]: wrapper,
  });

  return (
    <Container className={classes} fixed>
      {wrapper && topText && (
        <>
          <div className={styles.wrapperSideBlock}>
            <span>/{count}</span>
            <div className={styles.wrapperSideText}>
              {topText} <Line inline />
            </div>
          </div>
          <Container className={styles.wrapperTopBlock}>
            <div>/ Why Smart Fit</div>
          </Container>
        </>
      )}
      <div className={styles.wrapperContent}>{children}</div>
    </Container>
  );
};
export default Wrapper;
