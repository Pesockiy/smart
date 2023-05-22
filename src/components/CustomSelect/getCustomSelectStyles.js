export const getCustomSelectStyles = (isError) => {
  return {
    option: (provided, state) => {
      return {
        ...provided,
        position: 'relative',
        padding: 20,
        cursor: 'pointer',
        borderTop: '1px solid transparent',
        borderBottom: '1px solid transparent',
        transition: 'all 0.4s ease-out',
        paddingRight: '35px',
        backgroundColor: state.isFocused ? 'rgba(189, 195, 199, 0.1)' : 'transparent',

        '&:active': {
          backgroundColor: 'rgba(189, 195, 199, 0.1)',
        },
        '&:hover': {
          borderTop: '1px solid #71717C',
          borderBottom: '1px solid #71717C',
        },
        '&::after': {
          content: "''",
          width: '10px',
          height: '17px',
          position: 'absolute',
          right: '15px',
          borderTop: state.isSelected ? '2px solid #FF5F28' : 'none',
          borderLeft: state.isSelected ? '2px solid #FF5F28' : 'none',
          transform: 'rotate(-140deg)',
        },
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
    menuList: (base) => ({
      ...base,
      '&::-webkit-scrollbar': {
        width: 4,
      },

      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 5px #808080',
        borderRadius: 24,
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#FF5F28',
        borderRadius: 24,
      },
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
