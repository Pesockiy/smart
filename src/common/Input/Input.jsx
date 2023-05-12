import React, { useId } from 'react';
import cx from 'class-names';

import styles from './Input.module.sass';

const { inputWrapper, select, input, className } = styles;

const Input = ({ label, className, value, placeholder, defaultValue }) => {
  const id = useId();
  return (
    <div className={cx(styles.inputField, className)}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputWrapper}>
        <input type="text" className={cx(input)} value={value} defaultValue={defaultValue} placeholder={placeholder} />
      </div>
    </div>
  );
};

export default Input;
