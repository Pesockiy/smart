import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'next-share';

import { useCopy } from '@/hooks';
import FaceBookIcon from '@/assets/icons/facebook.svg';
import InstagramIcon from '@/assets/icons/instagram.svg';
import LinkedInIcon from '@/assets/icons/linkedin.svg';
import WhatsUpIcon from '@/assets/icons/whatsup.svg';
import TwitterIcon from '@/assets/icons/twitter.svg';
import CopyIcon from '@/assets/icons/copy.svg';
import styles from './SocialSharing.module.sass';

const SocialSharing = ({ post }) => {
  const { onCopy } = useCopy();

  const url = `${HOSTNAME}/media/${post.id}`;
  // FIXME: instagram does not work;
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Share:</span>

      <ul className={styles.list}>
        <li className={styles.listItem}>
          <button type="button">
            <InstagramIcon className={styles.icon} />
          </button>
        </li>

        <li className={styles.listItem}>
          <FacebookShareButton
            url={url}
            title={post.title}
            quote={post.description}
          >
            <FaceBookIcon className={styles.icon} />
          </FacebookShareButton>
        </li>

        <li className={styles.listItem}>
          <TwitterShareButton
            url={url}
            title={post.title}
            quote={post.description}
          >
            <TwitterIcon className={styles.icon} />
          </TwitterShareButton>
        </li>

        <li className={styles.listItem}>
          <LinkedinShareButton
            url={url}
            title={post.title}
            quote={post.description}
          >
            <LinkedInIcon className={styles.icon} />
          </LinkedinShareButton>
        </li>

        <li className={styles.listItem}>
          <WhatsappShareButton
            url={url}
            title={post.title}
            quote={post.description}
          >
            <WhatsUpIcon className={styles.icon} />
          </WhatsappShareButton>
        </li>

        <li className={styles.listItem}>
          <button type="button" onClick={() => onCopy(url)}>
            <CopyIcon className={styles.icon} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SocialSharing;
