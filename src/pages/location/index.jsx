import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  MarkerClusterer,
  InfoWindow,
  Autocomplete,
} from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import ArrowIcon from '../../assets/icons/arrow.svg';
import Container from '@/common/Container/Container';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import styles from './Location.module.sass';
import { locationMapStyles } from '@/utilits/variables';
import MessageIcon from '@/common/MessageIcon/MessageIcon';
import PhoneIcon from '@/common/PhoneIcon/PhoneIcon';
import LocationIcon from '@/common/LocationIcon/LocationIcon';
import TimeIcon from '@/common/TimeIcon/TimeIcon';
import CopyIcon from '@/common/CopyIcon/CopyIcon';
import { useCopy } from '@/hooks';
import LinkIcon from '@/common/LinkIcon/LinkIcon';

const CENTER = { lat: 33.01982568565792, lng: -117.28095444398336 };
const DEFAULT_ZOOM = 9;
const DEFAULT_MIN_ZOOM = 4;

const Locations = {
  async get() {
    const response = await fetch('http://localhost:3000/api/locations');
    return response.json();
  },
};
const libraries = ['places', 'geometry'];

const Location = (props) => {
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

      {!isLoaded && <div>Loading...</div>}

      <div className={styles.wrapper}>
        {isLoaded && (
          <Map mapContainerClassName={styles.map} locations={props.locations} />
        )}
      </div>
    </Container>
  );
};

const LocationsSidebar = ({ locations, map }) => {
  const { onCopy } = useCopy();

  const onLocationClick = async (address) => {
    const geocoder = new google.maps.Geocoder();

    const res = await geocoder.geocode({ address });

    const location = res.results[0].geometry.location;

    if (map) {
      map.panTo(location);
      map.setZoom(13);
    }
  };

  return (
    <div>
      <ul className={styles.locationList}>
        {locations.map((location) => (
          <li key={location.id}>
            <header className={styles.locationHeader}>
              <Heading size="sm" className={styles.locationHeader}>
                {location.title}
              </Heading>
              <button
                type="button"
                onClick={() => onLocationClick(location.address)}
              >
                <ArrowIcon className={styles.arrow} />
              </button>
            </header>

            <span className={styles.line}></span>

            <div className={styles.details}>
              <div className={styles.detailsItem}>
                <LocationIcon />
                <p>{location.address}</p>
                <button type="button" onClick={() => onCopy(location.address)}>
                  <CopyIcon />
                </button>
              </div>

              <div className={styles.detailsItem}>
                <PhoneIcon />
                <p>{location.phone}</p>

                <a href={`tel:${location.phone}`}>
                  <LinkIcon />
                </a>

                <button type="button" onClick={() => onCopy(location.phone)}>
                  <CopyIcon />
                </button>
              </div>

              <div className={styles.detailsItem}>
                <MessageIcon />
                <p>{location.email}</p>

                <a href={`mailto:${location.email}`}>
                  <LinkIcon />
                </a>

                <button type="button" onClick={() => onCopy(location.email)}>
                  <CopyIcon />
                </button>
              </div>

              <div className={styles.detailsItem}>
                <TimeIcon />
                <p className={styles.schedule}>
                  <span>Mon-Fri: {location.schedule.weekdays}</span>
                  <span>Sat-San: {location.schedule.weekends}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Map = ({ mapContainerClassName, locations }) => {
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [currentLatLng, setCurrentLatLng] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const getCoordinates = async () => {
      const geocodePromise = locations.map((location) => {
        return getGeocode({ address: location.address });
      });
      const geocodes = await Promise.all(geocodePromise);

      const coordinatesPromise = geocodes.map((geocode) => {
        return getLatLng(geocode[0]);
      });
      const coordinates = await Promise.all(coordinatesPromise);

      setMarkers(coordinates);
    };

    getCoordinates();
  }, [locations]);

  const handleMarkerClick = (position) => {
    const map = mapRef.current;

    if (map) {
      map.panTo(position);
      map.setZoom(13);
    }
  };

  const hasMarkers = markers.length > 0;

  // TODO: try to import img to js file;

  const icon = {
    url: '/images/location/location-marker.svg',
    scaledSize: new window.google.maps.Size(20, 20),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(15, 15),
  };

  const options = {
    minimumClusterSize: 2,
    styles: [
      {
        url: '/images/location/location-marker.svg',
        textColor: '#141417',
        width: 64,
        height: 64,
      },
    ],
  };

  const onPlaceChanged = async () => {
    const map = mapRef.current;
    const place = autocompleteRef.current.getPlace();

    const { lat, lng } = await getLatLng(place);

    if (map) {
      map.panTo({ lat, lng });
      map.setZoom(9);
    }

    setCurrentLatLng({ lat, lng });
  };

  return (
    <div className={styles.w}>
      <div className={styles.sidebar}>
        <Autocomplete
          className={styles.autocomplete}
          onPlaceChanged={onPlaceChanged}
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
        >
          <input
            className={styles.input}
            type="text"
            placeholder="Search your location"
          />
        </Autocomplete>
        <LocationsSidebar locations={locations} map={mapRef.current} />
      </div>

      <GoogleMap
        zoom={DEFAULT_ZOOM}
        options={{
          minZoom: DEFAULT_MIN_ZOOM,
          styles: locationMapStyles,
        }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        center={CENTER}
        mapContainerClassName={mapContainerClassName}
      >
        {currentLatLng && <MarkerF position={currentLatLng} icon={icon} />}

        <MarkerClusterer options={options}>
          {(clusterer) => {
            return hasMarkers ? (
              <MarkersList
                markers={markers}
                clusterer={clusterer}
                onClick={handleMarkerClick}
              />
            ) : null;
          }}
        </MarkerClusterer>
      </GoogleMap>
    </div>
  );
};

const MarkersList = ({ markers, clusterer, onClick }) => {
  const icon = {
    url: '/images/location/marker.svg',
    scaledSize: new window.google.maps.Size(50, 50),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(25, 1),
  };

  return (
    <>
      {markers.map((marker, idx) => (
        <MarkerF
          onClick={() => onClick(marker)}
          key={idx}
          position={marker}
          icon={icon}
          clusterer={clusterer}
          animation={google.maps.Animation.DROP}
        />
      ))}
    </>
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

export default Location;
