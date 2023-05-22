import { useState, useRef } from 'react';

import styles from './VerifyCodeInputs.module.sass';

const VerifyCodeInputs = () => {
  const [values, setValues] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (value, idx) => {
    const newValues = [...values];

    newValues[idx] = value;

    setValues(newValues);

    if (value !== '' && !isNaN(value)) {
      const nextIndex = idx + 1;

      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  return (
    <div className={styles.inputsContainer}>
      {values.map((value, idx) => {
        return (
          <input
            type="number"
            key={idx}
            value={value}
            ref={(el) => (inputRefs.current[idx] = el)}
            onChange={(evt) => handleChange(evt.target.value, idx)}
          />
        );
      })}
    </div>
  );
};

export default VerifyCodeInputs;
