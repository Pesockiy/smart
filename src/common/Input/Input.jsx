import React, { useId } from "react";
import cx from "class-names";
import Select, { components } from "react-select";
import Image from "next/image";

import styles from "./Input.module.sass";

const { inputWrapper, select, input, d } = styles;

const countries = [
  { value: "+1", label: "KZ" },
  { value: "+2", label: "PL" },
  { value: "+38", label: "ua" },
];

// Good: Custom component declared outside of the Select scope
const Control = ({ children, ...props }) => (
  <components.Control {...props}>
    {children}
    {/* <components.ClearIndicator></components.ClearIndicator> */}
  </components.Control>
);

const GoodSelect = (props) => (
  <Select {...props} renderDropdownIndicator={false } components={{ Control }} />
);

const Input = ({ label, className }) => {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className={inputWrapper}>
        {/* <Select
          options={countries}
          className={select}
          menuPlacement="top"
          menuPosition="absolute"
          classNames={{
            control: (state) => (state.isFocused ? "r" : "a"),
            indicatorSeparator: () => 'none',
          }}
          classNamePrefix={d}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              text: "orangered",
              primary25: "hotpink",
              primary: "black",
            },
          })}
          formatOptionLabel={(country) => (
            <Image
              url={`https://flagsapi.com/${country.lebel}/flat/64.png`}
              loading="lazy"
              alt=""
              width={20}
              height={20}
            />
          )}
        /> */}
        <GoodSelect menuIsOpen={true} options={countries} />
        <input type="text" className={cx(input)} />
      </div>
    </>
  );
};

export default Input;
