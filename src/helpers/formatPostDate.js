export const formatPostDate = (date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  });

  return formatter.format(new Date(date)).toUpperCase().replace(/,\s/g, '/');
};
