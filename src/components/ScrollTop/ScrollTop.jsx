import React from "react";

import styles from "./ScrollTop.module.sass";

import ArrowTopIcon from "@/assets/icons/Arrow-top.svg";

const { scrollTop, scrollTopImg } = styles;

const ScrollTop = ({ onClick }) => {
  return (
    <div className={scrollTop} onClick={onClick}>
      Back to top{" "}
      <div className={scrollTopImg}>
        <ArrowTopIcon />
      </div>
    </div>
  );
};

export default ScrollTop;
