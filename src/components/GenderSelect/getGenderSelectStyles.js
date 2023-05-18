export const getGenderSelectStyles = (isError) => {
  return {
    option: (provided, state) => {
      console.log({ state });
      return {
        ...provided,
        padding: 20,
        backgroundColor: state.isSelected
          ? 'rgba(189, 195, 199, 0.2)'
          : state.isFocused
          ? 'rgba(189, 195, 199, 0.05)'
          : undefined,
      };
    },
    control: (provided) => ({
      ...provided,
      borderWidth: 1,
      borderRadius: 8,
      marginTop: 5,
      boxShadow: 'none',
      color: '#fff',
      height: 50,
      minHeight: 50,
      border: isError ? '1px solid #F04141' : '1px solid #ADADAD',
      background:
        'linear-gradient(179.55deg, rgba(138, 135, 135, 0.2) -3.48%, rgba(75, 78, 91, 0.3) 48.02%, rgba(109, 110, 113, 0.2) 99.61%)',
      '&:hover': {
        borderColor: isError ? '#F04141' : '#ADADAD',
      },
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return {
        ...provided,
        opacity,
        transition,
        color: '#FFF',
      };
    },
    input: (base) => ({
      ...base,
      color: '#FFF',
    }),
    container: (base) => ({
      ...base,
    }),
    placeholder: (base) => ({
      ...base,
      color: '#FFF',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#141417',
      border: '1px solid #71717C',
      borderRadius: 8,
    }),
    valueContainer: (base) => ({
      ...base,
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: 'none',
    }),
    indicatorsContainer: (base) => ({
      ...base,
      opacity: isError ? 0 : 1,
    }),
  };
};
