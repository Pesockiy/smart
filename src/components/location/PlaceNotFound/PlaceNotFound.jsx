import Text from '@/common/Text/Text';
import styles from './PlaceNotFound.module.sass';

const PlaceNotFound = ({ name }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <Text>
          {`We have not found any studios named "${name}". Please change your search.`}
        </Text>
      </div>
    </div>
  );
};

export default PlaceNotFound;
