export const truncateTextByLength = ({ text, length }) => {
  const wordsList = text.split(' ');

  if (wordsList.length <= length) {
    return text;
  }

  const truncatedWordsList = wordsList.slice(0, length);
  const truncatedText = truncatedWordsList.join(' ') + '...';

  return truncatedText;
};
