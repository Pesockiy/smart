import CallIcon from '@/assets/icons/call.svg';

export const CallLink = ({ phone, className = '' }) => {
  return (
    <a href={`tel:${phone}`} className={className}>
      <CallIcon />
    </a>
  );
};
