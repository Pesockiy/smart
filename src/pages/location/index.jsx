import { useLoadScript } from '@react-google-maps/api';

import Container from '@/common/Container/Container';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import styles from './Location.module.sass';
import StoresMap from '@/components/location/StoresMap/StoresMap';

const Locations = {
  async get() {
    const response = await fetch(`${HOSTNAME}/api/locations`);
    return response.json();
  },
};
const libraries = ['places', 'geometry'];

const LocationPage = (props) => {
  const { isLoaded } = useLoadScript({
    libraries,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  return (
    <Container className={styles.container}>
      <Heading className={styles.header}>
        <Text gradient as="span">
          Find an Fitness Studio Near You.
        </Text>
      </Heading>

      <div className={styles.wrapper}>
        <StoresMap
          mapContainerClassName={styles.map}
          locations={props.locations}
          isLoaded={isLoaded}
        />
      </div>
    </Container>
  );
};

export const getServerSideProps = async () => {
  const response = await Locations.get();

  return {
    props: {
      locations: response.locations,
    },
  };
};

export default LocationPage;
