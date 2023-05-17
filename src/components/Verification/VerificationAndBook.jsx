import Button from '@/common/Button/Button';
import { useBookFreeWorkoutContext } from '@/context/BookFreeWorkoutContext';

const VerificationAndBook = () => {
  const context = useBookFreeWorkoutContext();

  return (
    <div>
      <Button outlined variant="secondary" onClick={context.handlePrev}>
        Prev
      </Button>
      <Button outlined variant="primary">
        Validate
      </Button>
    </div>
  );
};

export default VerificationAndBook;
