import { memo } from "react";
import cx from "class-names";

import { progressBar } from "./ProgressBar.module.sass";

const ProgressBar = ({ className, progress = 0 }) => {
  return (
    <div
      className={cx(progressBar, className)}
      style={{ backgroundSize: `${progress}%` }}
    />
  );
};
export default memo(ProgressBar);
