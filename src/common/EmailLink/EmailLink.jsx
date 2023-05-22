import LinkIcon from '../LinkIcon/LinkIcon';

export const EmailLink = ({ email, className = '' }) => {
  return (
    <a className={className} href={`mailto:${email}`}>
      <LinkIcon />
    </a>
  );
};
