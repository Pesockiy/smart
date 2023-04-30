import Container from "@/common/Container/Container";
import Wrapper from "@/components/Wrapper/Wrapper";

import styles from "./SectionContainer.module.sass";

const SectionContainer = ({
  wrapper = false,
  rtl = false,
  vCenter = false,
  children = null,
  count = "02",
  subtitle
}) => {
  return (
    <Wrapper wrapper={wrapper} className={styles.SectionContainerWrap} count={count} subtitle={subtitle}>
      <Container
        disableGutters={wrapper}
        className={styles.SectionContainerTop}
        style={{
          flexDirection: rtl ? "row-reverse" : "row",
          alignItems: vCenter ? "center" : "flex-start",
        }}
      >
        {children}
      </Container>
    </Wrapper>
  );
};

export default SectionContainer;
