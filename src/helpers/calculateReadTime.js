const calculateReadTime = ({ text, wordsPerMinute = 200 }) => {
  const words = text.trim().split(/\s+/).length;
  const readTimeMinutes = words / wordsPerMinute;

  return Math.floor(readTimeMinutes);
};

export default calculateReadTime;
