import Select from 'react-select';
import InputMask from 'react-input-mask';
import cx from 'class-names';
import { forwardRef } from 'react';

import styles from './PhoneInput.module.sass';
import { useHandleCountryPhoneOptions } from '@/hooks';
import { createCountryOption } from '../CountryFlag/CountryFlag';
import AttentionSVG from '@/assets/icons/attention.svg';
import { getCountrySelectStyles } from './getCountrySelectStyles';

const PhoneInput = forwardRef(({ error, id, label, name = 'phone', ...field }, ref) => {
  const { countryList, option, setOption } = useHandleCountryPhoneOptions();
  const countryOptions = convertCountryListToOptions(countryList);

  const code = option ? option.info.code.root : '+1';
  const placeholder = `${code} ( ●●● ) ●●● ●●●●`;
  const mask = `${code} (999) 999-9999`;

  const wrapperClasses = cx(styles.wrapper, { [styles.defaultWrapper]: !label });

  return (
    <div className={styles.container}>
      {label && <span className={styles.labelTitle}>{label}</span>}
      <div className={wrapperClasses}>
        <Select
          placeholder="flag"
          value={option}
          styles={getCountrySelectStyles(!!error)}
          options={countryOptions}
          onChange={(selectedOption) => setOption(selectedOption)}
        />

        <InputMask
          {...field}
          ref={ref}
          id={id}
          maskChar=" "
          autoComplete="off"
          name={name}
          className={cx(styles.input, { [styles.fieldError]: !!error })}
          mask={mask}
          placeholder={placeholder}
        />
        {error && <AttentionSVG className={styles.attentionIcon} />}
      </div>
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
});

const convertCountryListToOptions = (list) => {
  return list.map((country) => createCountryOption(country));
};

export default PhoneInput;
