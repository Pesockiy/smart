import { useState } from 'react';

const useCopy = () => {
  const [isCopied, setCopied] = useState(false);

  const onCopy = (value) => {
    navigator.clipboard.writeText(String(value));
    setCopied(true);
  };

  return {
    isCopied,
    onCopy,
  };
};

export default useCopy;
