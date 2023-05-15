import Select from 'react-select';

import FormTooltip from '../FormTooltip/FormTooltip';
import AttentionSVG from '@/assets/icons/attention.svg';
import styles from './GenderSelect.module.sass';

import { getGenderSelectStyles } from './getGenderSelectStyles';

export const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Not specified', value: 'not specified' },
];

const GenderSelect = ({ error, label, id, ...field }) => {
  return (
    <label htmlFor={id}>
      {label && (
        <div className={styles.labelTitle}>
          {label}
          <FormTooltip className={styles.tooltip}>
            <span>Gender</span> is ...
          </FormTooltip>
        </div>
      )}

      <div className={styles.selectContainer}>
        <Select
          {...field}
          id={id}
          isClearable
          options={GENDER_OPTIONS}
          styles={getGenderSelectStyles(!!error)}
          placeholder="Select gender"
        />
        {error && <AttentionSVG className={styles.attentionIcon} />}
      </div>

      {error && <div className={styles.error}>{error.message}</div>}
    </label>
  );
};

export default GenderSelect;
