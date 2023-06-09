import { forwardRef } from 'react';
import cx from 'class-names';

import { useToggle } from '@/hooks';

import Heading from '../Heading/Heading';

import IconArrow from '@/assets/icons/arrow.svg';

import {
  accordion,
  accordionHeader,
  accordionBody,
  accordionIcon,
  isActive,
} from './Accordion.module.sass';

const Accordion = forwardRef(({ title, children, className, open = false }, ref) => {
  const [isOpen, setIsOpen] = useToggle(open);

  const showHandler = () => setIsOpen((prev) => !prev);

  return (
    <div
      ref={ref}
      className={cx(
        accordion,
        {
          [isActive]: isOpen,
        },
        className
      )}
      onClick={showHandler}
    >
      <Heading size="sm" as="h3" className={accordionHeader}>
        {title} <IconArrow className={accordionIcon} />
      </Heading>
      <div className={accordionBody}>{children}</div>
    </div>
  );
});

export default Accordion;
