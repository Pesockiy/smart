import cx from "class-names";

import Container from "@/common/Container/Container";
import Line from "@/common/Line/Line";

import styles from "./Wrapper.module.sass";

const Wrapper = ({
  wrapper = false,
  scrollText = true,
  topText = "Scroll",
  count = "02",
  children = null,
  className = "",
  subtitle = "",
}) => {
  const classes = cx(styles.wrapper, className, {
    [styles.wrapperInner]: wrapper,
  });

  return (
    <Container className={classes}>
      {wrapper && topText && (
        <>
          <div className={styles.wrapperSideBlock}>
            <span>/{count}</span>
            {scrollText && (
              <div className={styles.wrapperSideText}>
                {topText} <Line inline className={styles.wrapperSideLine} />
              </div>
            )}
          </div>
          {wrapper && (
            <Container className={styles.wrapperTopBlock}>
              <div>{`/ ${subtitle}`}</div>
            </Container>
          )}
        </>
      )}
      <div className={styles.wrapperContent}>{children}</div>
    </Container>
  );
};
export default Wrapper;
