import cx from 'class-names';

import AttentionSVG from '@/assets/icons/attention.svg';
import styles from './CustomInput.module.sass';

const CustomInput = (props) => {
  const {
    type = 'text',
    defaultValue = '',
    label = '',
    errors,
    register,
    fieldName,
    placeholder,
  } = props;

  const classes = cx(styles.label, { [styles.fieldError]: !!errors[fieldName] });

  return (
    <label className={classes} htmlFor={fieldName}>
      <span>{label}</span>

      <div className={styles.inputWrapper}>
        <input
          autoComplete="off"
          id={fieldName}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(fieldName)}
        />

        {errors[fieldName] && <AttentionSVG className={styles.attentionIcon} />}
      </div>

      {errors[fieldName] && <div className={styles.error}>{errors[fieldName].message}</div>}
    </label>
  );
};

export default CustomInput;
