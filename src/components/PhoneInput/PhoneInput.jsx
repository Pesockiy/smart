import Select from 'react-select';
import InputMask from 'react-input-mask';

import styles from './PhoneInput.module.sass';
import { countrySelectStyles } from './countrySelectStyles';
import { useHandleCountryPhoneOptions } from '@/hooks';
import { createCountryOption } from '../CountryFlag/CountryFlag';

const PhoneInput = ({ onChange, name = 'phone' }) => {
  const { countryList, option, setOption } = useHandleCountryPhoneOptions();
  const countryOptions = convertCountryListToOptions(countryList);

  const code = option ? option.info.code.root : '+1';
  const placeholder = `${code} ( ●●● ) ●●● ●●●●`;
  const mask = `${code} (999) 999-9999`;

  return (
    <div className={styles.container}>
      Phone
      <div className={styles.wrapper}>
        <Select
          placeholder="flag"
          value={option}
          styles={countrySelectStyles}
          options={countryOptions}
          onChange={(selectedOption) => setOption(selectedOption)}
        />

        <InputMask
          maskChar=" "
          name={name}
          onChange={(evt) => onChange(evt.target.value)}
          className={styles.input}
          mask={mask}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

const convertCountryListToOptions = (list) => {
  return list.map((country) => createCountryOption(country));
};

export default PhoneInput;
