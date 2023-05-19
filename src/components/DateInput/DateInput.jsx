import InputMask from 'react-input-mask';
import cx from 'class-names';
import { forwardRef } from 'react';

import AttentionSVG from '@/assets/icons/attention.svg';
import styles from './DateInput.module.sass';
import FormTooltip from '../FormTooltip/FormTooltip';

const placeholder = 'MM-DD-YYYY';

const formatChars = {
  n: '[0-9]',
  m: '[0-2]',
  e: '[0-3]',
  d: '[0-9]',
  z: '[0-9]',
  y: '[0-9]',
};

const DateInput = forwardRef(({ error, label, ...props }, ref) => {
  return (
    <label className={cx(styles.label, { [styles.fieldError]: !!error })}>
      {label && (
        <div className={styles.labelText}>
          {label}
          <FormTooltip className={styles.tooltip}>
            <span>Date of birth</span> is important for training as it can impact physical activity,
            health, nutrition and help select optimal training programs for better results.
          </FormTooltip>
        </div>
      )}

      <div className={styles.inputWrapper}>
        <InputMask
          {...props}
          id={props.id}
          name={props.name}
          autoComplete="off"
          alwaysShowMask={false}
          beforeMaskedValueChange={beforeMaskedValueChange}
          formatChars={formatChars}
          mask="nm-ed-zyyy"
          maskChar={null}
          value={props.value}
          placeholder={placeholder}
        />
        {error && <AttentionSVG className={styles.attentionIcon} />}
      </div>
      {error && <div className={styles.error}>{error.message}</div>}
    </label>
  );
});

function findFirstPlaceholderIndex(value) {
  const placeholderPositions = [value.indexOf('m'), value.indexOf('d'), value.indexOf('y')].filter(
    (position) => position >= 0
  );

  if (placeholderPositions.length === 0) return null;

  return Math.min(...placeholderPositions);
}

function beforeMaskedValueChange(newState) {
  const value = fillInMaskWithLetters(newState.value);
  let selection = newState.selection;

  if (selection && selection.length === 1) {
    const index = findFirstPlaceholderIndex(value) || Math.max(0, value.length - 1);

    selection = {
      start: index,
      end: index,
      length: 1,
    };
  }

  return { value, selection };
}

function fillInMaskWithLetters(value) {
  if (!value) return '';

  const [month, day, year] = value.split('-');

  return [
    replaceMaskWithLetter(month, 'M', 2),
    replaceMaskWithLetter(day, 'D', 2),
    replaceMaskWithLetter(year, 'Y', 4),
  ].join('-');
}

function replaceMaskWithLetter(value, letter, length) {
  if (!value) value = '';

  value = value.replace(/[^0-9]/g, '');

  const MAX_DAY = 31;
  const isDayPart = letter === 'D';

  if (isDayPart && length === 2 && Number(value) > MAX_DAY) {
    return '31' + repeat(letter, length - value.length);
  }

  const isItMonthLetter = letter === 'M';
  const MAX_MONTH = 12;

  if (isItMonthLetter && length === 2 && Number(value) > MAX_MONTH) {
    return MAX_MONTH + repeat(letter, length - value.length);
  }

  return value + repeat(letter, length - value.length);
}

function repeat(str, count) {
  let result = '';

  for (let i = 0; i < count; i++) {
    result += str;
  }

  return result;
}

export default DateInput;
