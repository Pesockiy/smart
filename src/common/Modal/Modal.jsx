import React, { useEffect, useRef, useState } from "react";
import cx from "class-names";

import { useToggle, useOnClickOutside } from "@/hooks";

import Portal from "@/components/Portal/Portal";
import IconClose from "@/assets/icons/Icon-close.svg";
import styles from "./Modal.module.sass";

const Modal = ({
  className,
  open,
  center = false,
  overlay = false,
  onClose = () => {},
  onOnsuccess = () => {},
  children,
}) => {
  const classes = cx(styles.modal, className, {
    [styles.center]: center,
    [styles.overlay]: overlay,
  });

  const [isVisible, setIsvisible] = useToggle(open);
  const ref = useRef(null);

  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("isHidden");
    }
    return () => {
      document.documentElement.classList.remove("isHidden");
    };
  }, []);

  const closeHandler = (e) => {
    setIsvisible((prev) => !prev);
    e.stopPropagation();
    onClose();
  };

  // const clickOutside = useOnClickOutside(ref, onClose);

  if (isVisible) return null;

  return (
    <Portal>
      <div className={classes} onClick={closeHandler}>
        {/* <div ref={ref} className={styles.modalDialog} onClick={clickOutside}> */}
        <div ref={ref} className={styles.modalDialog}>
          {children}
          <button className={styles.modalButton} onClick={closeHandler}>
            <IconClose />
          </button>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
