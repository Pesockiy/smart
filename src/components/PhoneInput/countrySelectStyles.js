export const countrySelectStyles = {
  container: (base) => ({ ...base, width: 110 }),
  control: (base) => ({
    ...base,
    '&:hover': {
      borderColor: '#ADADAD',
    },
    borderColor: 'transparent',
    boxShadow: 'none',
    height: 50,
    minHeight: 50,
    border: '1px solid #ADADAD',
    borderRight: '1px solid transparent',
    borderRadius: '8px 0 0 8px',
    background:
      'linear-gradient(179.55deg, rgba(138, 135, 135, 0.2) -3.48%, rgba(75, 78, 91, 0.3) 48.02%, rgba(109, 110, 113, 0.2) 99.61%)',
  }),
  input: (base) => ({
    ...base,
    width: 50,
    color: '#FFF',
  }),
  indicatorSeparator: (base) => ({
    ...base,
    opacity: 0,
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#141417',
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
};
