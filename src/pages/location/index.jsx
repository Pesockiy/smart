import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  MarkerClusterer,
  InfoWindow,
  Autocomplete,
} from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css/navigation';
import 'swiper/css';

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
import {
  useCalculateRoutesDistance,
  useCopy,
  useGeocoder,
  useGetLatLngByLocations,
  usePlaceService,
} from '@/hooks';
import LinkIcon from '@/common/LinkIcon/LinkIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Virtual } from 'swiper';
import Button from '@/common/Button/Button';
import CloseIcon from '@/common/CloseIcon/CloseIcon';
import { getLatLngByPlace, isEmpty } from '@/helpers';
// FIXME: button search; calculate distance;
const DEFAULT_CENTER = { lat: 33.01982568565792, lng: -117.28095444398336 };
const DEFAULT_ZOOM = 9;
const DEFAULT_MIN_ZOOM = 4;

const Locations = {
  async get() {
    const response = await fetch('http://localhost:3000/api/locations');
    return response.json();
  },
};
const libraries = ['places', 'geometry'];

const LocationView = (props) => {
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
        {isLoaded && (
          <Map
            mapContainerClassName={styles.map}
            locations={props.locations}
            markers={props.locations}
          />
        )}
      </div>
    </Container>
  );
};

const CLUSTERER_OPTIONS = {
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

const isPlaceAvailable = (place) => place !== null;

const Map = ({ mapContainerClassName, locations, markers }) => {
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [distances, setDistances] = useState([]);
  const markerPositions = useGetLatLngByLocations({ locations: markers });
  const geocode = useGeocoder();
  const getPlaceDetails = usePlaceService();
  const calculateRoutesDistance = useCalculateRoutesDistance();

  const [currentLatLng, setCurrentLatLng] = useState(null);
  const [place, setPlace] = useState(null);

  const zoomByPosition = ({ position, zoom = 13 }) => {
    const map = mapRef.current;

    if (mapRef.current === undefined) return;

    map.panTo(position);
    map.setZoom(zoom);
  };

  const onSelect = async (id) => {
    setPlace(null);

    const location = locations.find((l) => l.id === id);

    const point = await geocode({ address: location.address });
    const place = await getPlaceDetails({
      placeId: point.results[0].place_id,
      map: mapRef.current,
    });

    setPlace(place);
    setSelectedId(id);
  };

  const setMyPosition = (position) => {
    zoomByPosition({ position, zoom: 10 });
    setCurrentLatLng(position);
  };

  const setToDefaultPosition = () => {
    setCurrentLatLng(null);
    mapRef.current?.panTo(DEFAULT_CENTER);
  };

  const onPlaceChanged = async () => {
    const map = mapRef.current;
    const place = autocompleteRef.current.getPlace();

    if (!place.place_id) {
      setNotFound(true);
      return;
    }

    const point = getLatLngByPlace(place);

    const miles = await calculateRoutesDistance({
      from: point,
      to: markerPositions,
    });

    map.panTo(point);
    map.setZoom(9);

    setCurrentLatLng(point);
    setDistances(miles);
    setNotFound(false);
  };

  const calculateDistanceFrom = async ({ from }) => {
    const miles = await calculateRoutesDistance({
      from,
      to: markerPositions,
    });

    setDistances(miles);
  };

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  return (
    <div className={styles.w}>
      <div className={styles.sidebar}>
        <GoogleAutocompleteInput
          onPlaceChanged={onPlaceChanged}
          onLoad={onLoad}
          setMyPosition={setMyPosition}
          setToDefaultPosition={setToDefaultPosition}
          setNotFound={setNotFound}
          calculateDistanceFrom={calculateDistanceFrom}
        />
        <LocationsList
          distances={distances}
          locations={locations}
          map={mapRef.current}
          onSelect={onSelect}
        />
      </div>

      <LocationHorizontalList map={mapRef.current} locations={locations} />

      <div className={styles.mapContainer}>
        {notFound && <PlaceNotFound name="Test" />}

        {isPlaceAvailable(place) && (
          <PlaceDetails place={place} onClose={() => setPlace(null)} />
        )}

        <MapView
          onLoad={(map) => {
            mapRef.current = map;
          }}
          center={DEFAULT_CENTER}
          mapContainerClassName={mapContainerClassName}
        >
          <>
            {currentLatLng && <MyPositionMarker position={currentLatLng} />}

            <ClustererView
              markers={markerPositions}
              locations={locations}
              selectedId={selectedId}
              zoomByPosition={zoomByPosition}
            />
          </>
        </MapView>
      </div>
    </div>
  );
};

function MapView({
  children,
  mapContainerClassName,
  onLoad = () => {},
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  minZoom = DEFAULT_MIN_ZOOM,
  styles = locationMapStyles,
}) {
  const mapRef = useRef(null);

  const onMapLoad = (map) => {
    onLoad(map);
    mapRef.current = map;
  };

  return (
    <GoogleMap
      zoom={zoom}
      options={{
        styles,
        minZoom,
        scrollwheel: false,
        mapTypeControl: false,
      }}
      onLoad={onMapLoad}
      center={center}
      mapContainerClassName={mapContainerClassName}
    >
      {children}
    </GoogleMap>
  );
}

function PlaceDetails({ place, onClose }) {
  return (
    <div className={styles.googleInfoBox}>
      {place.photos && (
        <img className={styles.infoBoxImg} src={place.photos[0].getUrl()} />
      )}

      <div className={styles.infoBoxContent}>
        {place.rating && <p>{place.rating} rating</p>}
        {place.reviews && <p>{place.reviews.length} Google reviews</p>}
        <p>{place.formatted_address}</p>

        <Button variant="primary">Book a free workout</Button>
      </div>

      <button
        className={styles.infoBoxCloseBtn}
        type="button"
        onClick={onClose}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

function GoogleAutocompleteInput({
  onLoad,
  onPlaceChanged,
  setMyPosition,
  setToDefaultPosition,
  setNotFound,
  calculateDistanceFrom,
}) {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const geocode = useGeocoder();

  const onSearch = async () => {
    try {
      const place = await geocode({ address: searchValue });

      await calculateDistanceFrom({ from: getLatLngByPlace(place.results[0]) });

      setNotFound(false);
      setMyPosition(getLatLngByPlace(place.results[0]));
    } catch (error) {
      con;
      setNotFound(true);
    }
  };

  const onClear = () => {
    setToDefaultPosition();
    setSearchValue('');
    setNotFound(false);

    inputRef.current.value = '';
  };

  const onAutocompleteLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
    onLoad(autocomplete);
  };

  const handleChange = () => {
    const place = autocompleteRef.current?.getPlace();

    if (place.formatted_address) {
      setSearchValue(place.formatted_address);
      onPlaceChanged(place);
    }
  };

  return (
    <Autocomplete
      className={styles.autocomplete}
      onPlaceChanged={handleChange}
      onLoad={onAutocompleteLoad}
    >
      <div className={styles.searchWrapper}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="Search your location"
          onChange={(evt) => setSearchValue(evt.target.value)}
        />
        {!isEmpty(searchValue) && (
          <button className={styles.clearBtn} onClick={onClear}>
            <CloseIcon />
          </button>
        )}
        <button className={styles.searchBtn} onClick={onSearch}>
          Search
        </button>
      </div>
    </Autocomplete>
  );
}

function ClustererView({ markers, locations, zoomByPosition }) {
  const hasMarkers = markers.length > 0;

  if (!hasMarkers) return null;

  const onMarkerClick = (position) => {
    zoomByPosition({ position });
  };

  return (
    <MarkerClusterer options={CLUSTERER_OPTIONS}>
      {(clusterer) => {
        return (
          <MarkersList
            markers={markers}
            locations={locations}
            clusterer={clusterer}
            onClick={onMarkerClick}
          />
        );
      }}
    </MarkerClusterer>
  );
}

const MarkersList = ({ markers, clusterer, onClick, locations }) => {
  const [activeId, setActiveId] = useState(null);

  const icon = {
    url: '/images/location/marker.svg',
    scaledSize: new window.google.maps.Size(50, 50),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(25, 1),
  };

  const onMarkerClick = (marker, idx) => {
    onClick(marker);
    setActiveId(locations[idx].id);
  };

  return (
    <>
      {markers.map((marker, idx) => {
        const location = locations[idx];
        const isPopUpActive = location.id === activeId;

        return (
          <MarkerF
            key={idx}
            position={marker}
            icon={icon}
            clusterer={clusterer}
            animation={google.maps.Animation.DROP}
            onClick={() => onMarkerClick(marker, idx)}
          >
            {isPopUpActive && (
              <MarkerPopUp
                key={location.id}
                position={marker}
                title={`Smart fir method/${location.title}`}
                onClose={() => setActiveId(null)}
              />
            )}
          </MarkerF>
        );
      })}
    </>
  );
};

function MarkerPopUp({ position, title, onClose }) {
  return (
    <InfoWindow position={position} onCloseClick={onClose}>
      <div className={styles.infoWindow}>
        <h2>{title}</h2>
      </div>
    </InfoWindow>
  );
}

function MyPositionMarker({ position }) {
  const icon = {
    url: '/images/location/location-marker.svg',
    scaledSize: new window.google.maps.Size(20, 20),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(15, 15),
  };

  return <MarkerF position={position} icon={icon} />;
}
function LocationsList({ locations, map, onSelect, distances = [] }) {
  const [selectedId, setSelectedId] = useState(null);
  const geocode = useGeocoder();
  // TODO: sort by miles;
  // TODO: distance and location should be together or we should have Map([[locationId, distance]])
  const locationsWithDistance = locations.map((location, idx) => ({
    ...location,
    distance: distances[idx],
  }));

  const sortedByDistance = [...locationsWithDistance].sort(
    (prev, current) => prev.distance - current.distance
  );

  const onLocationClick = async (location) => {
    const place = await geocode({ address: location.address });

    const coordinates = place.results[0].geometry.location;

    if (map) {
      map.panTo(coordinates);
      map.setZoom(13);

      setSelectedId(location.id);
      onSelect(location.id);
    }
  };

  return (
    <div>
      <ul className={styles.locationList}>
        {sortedByDistance.map((location) => (
          <LocationItem
            key={location.id}
            location={location}
            onLocationClick={onLocationClick}
            selectedId={selectedId}
            distance={location.distance}
          />
        ))}
      </ul>
    </div>
  );
}

function LocationItem({
  location,
  onLocationClick,
  selectedId,
  distance = null,
}) {
  const { onCopy } = useCopy();

  const isLocationActive = (location) => location.id === selectedId;

  return (
    <li className={styles.listItem}>
      <header className={styles.locationHeader}>
        <Heading size="sm" className={styles.locationHeader}>
          <Text as="span" gradient={isLocationActive(location)}>
            {location.title}
          </Text>
        </Heading>

        <button type="button" onClick={() => onLocationClick(location)}>
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

        <div className={styles.miles}>
          {distance && <div>{distance} miles</div>}
        </div>
      </div>
    </li>
  );
}

function LocationHorizontalList({ locations, map }) {
  useEffect(() => {
    if (map) {
      map.panBy(0, 100);
    }
  }, [map]);

  return (
    <Swiper
      className={styles.slider}
      modules={[Navigation, Virtual]}
      slidesPerView="auto"
    >
      {locations.map((location) => {
        return (
          <SwiperSlide key={location.id} className={styles.slide}>
            <LocationItem
              location={location}
              onLocationClick={() => {}}
              selectedId={null}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

function PlaceNotFound({ name }) {
  return (
    <div className={styles.notFoundContainer}>
      <div>
        <Text>
          {`We have not found any studios named "${name}". Please change your search.`}
        </Text>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await Locations.get();

  return {
    props: {
      locations: response.locations,
    },
  };
};

export default LocationView;
