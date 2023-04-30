import React, { useEffect } from "react";
import cx from "class-names";

import { useToggle } from "@/hooks";

import Portal from "@/components/Portal/Portal";
import IconClose from "@/assets/icons/Icon-close.svg";
import styles from "./Modal.module.sass";

const Modal = ({
  className,
  active,
  closeButton,
  center = false,
  setActive = () => {},
  onOnSuccess = () => {},
  children,
}) => {
  const classes = cx(styles.modal, className, {
    [styles.center]: center,
  });

  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("isHidden");
    }
    return () => {
      document.documentElement.classList.remove("isHidden");
    };
  }, []);

  const closeHandler = setActive();

  return (
    <Portal>
      <div className={classes} onClick={setActive}>
        <div className={styles.modalDialog}>
          {children}
          {closeButton && (
            <button className={styles.modalButton} onClick={setActive}>
              <IconClose />
            </button>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
