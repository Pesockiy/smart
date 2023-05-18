export const formatDate = ({ options, date }) => {
  const dateFormatter = new Intl.DateTimeFormat('en-US', options);
  return dateFormatter.format(date);
};
