import Select from 'react-select';
import { forwardRef } from 'react';

import AttentionSVG from '@/assets/icons/attention.svg';
import styles from './CustomSelect.module.sass';
import { getCustomSelectStyles } from './getCustomSelectStyles';
// TODO: tooltip;
const CustomSelect = forwardRef(
  ({ error, options, placeholder = '', label, id, ...field }, ref) => {
    return (
      <label htmlFor={id}>
        {label && <div className={styles.labelTitle}>{label}</div>}

        <div className={styles.selectContainer}>
          <Select
            ref={ref}
            {...field}
            instanceId={id}
            isClearable
            options={options}
            styles={getCustomSelectStyles(!!error)}
            placeholder={placeholder}
          />
          {error && <AttentionSVG className={styles.attentionIcon} />}
        </div>

        {error && <div className={styles.error}>{error.message}</div>}
      </label>
    );
  }
);

export default CustomSelect;
