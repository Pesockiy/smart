import cx from 'class-names';

import AlertSVG from '@/assets/icons/alert.svg';
import styles from './FormTooltip.module.sass';

const FormTooltip = ({ children, className = '' }) => {
  return (
    <div className={cx(styles.tooltip, { [className]: !!className })}>
      <AlertSVG className={styles.tooltipIcon} width={12} height={12} />
      <div className={styles.tooltipText}>{children}</div>
    </div>
  );
};

export default FormTooltip;
