import React, { useId } from "react";
import cx from "class-names";

import styles from "./Input.module.sass";

const { inputWrapper, select, input, d } = styles;

const Input = ({ label, className }) => {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className={inputWrapper}>
        <input type="text" className={cx(input)} />
      </div>
    </>
  );
};

export default Input;
