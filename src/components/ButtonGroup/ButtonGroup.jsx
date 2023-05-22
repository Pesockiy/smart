import cx from 'class-names';
import { useState } from 'react';

import styles from './ButtonGroup.module.sass';

const ButtonGroup = ({
  options,
  onClick = () => {},
  wrapperClassName = '',
  defaultOption = null,
}) => {
  const [activeOption, setActiveOption] = useState(defaultOption ?? options[0]);

  const handleOptionClick = (option) => {
    setActiveOption(option);
    onClick(option);
  };

  const className = cx(styles.wrapper, { [wrapperClassName]: !!wrapperClassName });

  return (
    <div className={className}>
      {options.map((option) => {
        const isActive = activeOption.value === option.value;

        return (
          <OptionButton
            key={option.value}
            isActive={isActive}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </OptionButton>
        );
      })}
    </div>
  );
};

const OptionButton = ({ children, isActive, onClick }) => (
  <button type="button" className={isActive ? styles.active : ''} onClick={onClick}>
    {children}
  </button>
);

export default ButtonGroup;
