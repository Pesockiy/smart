import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  MarkerClusterer,
  InfoWindow,
  Autocomplete,
  InfoBox,
} from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
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
import { useCopy } from '@/hooks';
import LinkIcon from '@/common/LinkIcon/LinkIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Virtual } from 'swiper';
import Button from '@/common/Button/Button';
import CloseIcon from '@/common/CloseIcon/CloseIcon';
import Img from '@/common/Img/Img';

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
          <Map
            mapContainerClassName={styles.map}
            locations={props.locations}
            markers={props.locations}
            isLoaded={isLoaded}
          />
        )}
      </div>
    </Container>
  );
};

const useGetLatLngByLocations = ({ locations }) => {
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

  return markers;
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

const Map = ({ mapContainerClassName, locations, markers }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [distances, setDistances] = useState([]);

  const markersLatLngs = useGetLatLngByLocations({ locations: markers });
  const distanceServiceRef = useRef(new google.maps.DistanceMatrixService());
  const [currentLatLng, setCurrentLatLng] = useState(null);
  const [place, setPlace] = useState(null);

  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  const zoomByPosition = ({ position, zoom = 13 }) => {
    const map = mapRef.current;

    if (mapRef.current === undefined) return;

    map.panTo(position);
    map.setZoom(zoom);
  };

  const onSelect = async (id) => {
    setPlace(null);
    const location = locations.find((l) => l.id === id);

    const geocoder = new google.maps.Geocoder();

    const res = await geocoder.geocode({
      // address: 'The Smart Fit Method, Chesterfield Drive, Cardiff, CA, USA',
      // address: 'The Smart Fit Method, Chesterfield Drive, Cardiff, CA, USA',
      address: location.address,
    });

    const placeService = new google.maps.places.PlacesService(mapRef.current);

    placeService.getDetails(
      {
        placeId: res.results[0].place_id,
        fields: [
          'photo',
          'rating',
          'name',
          'formatted_address',
          'reviews',
          'address_components',
        ],
      },
      (place, status) => {
        if (status === 'OK') {
          setPlace(place);
        }
      }
    );

    setSelectedId(id);
  };

  const setMyPosition = (position) => {
    zoomByPosition({ position });
    setCurrentLatLng(position);
  };

  const setToDefaultPosition = () => {
    setCurrentLatLng(null);
    mapRef.current?.panTo(CENTER);
  };

  const onPlaceChanged = async () => {
    const map = mapRef.current;
    const place = autocompleteRef.current.getPlace();

    if (place.place_id) {
      setNotFound(false);

      const { lat, lng } = await getLatLng(place);

      map.panTo({ lat, lng });
      map.setZoom(9);

      setCurrentLatLng({ lat, lng });

      // NOTE: distances;
      const from = { lat, lng };
      const to = markersLatLngs;

      const request = {
        origins: [from],
        destinations: to,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false,
      };

      const distance = await distanceServiceRef.current.getDistanceMatrix(
        request
      );

      const rows = distance.rows[0].elements.map(async (row, idx) => {
        if (row.status === 'OK') {
          return row;
        }

        const geocoder = new google.maps.Geocoder();

        const place = await geocoder.geocode({
          address: distance.destinationAddresses[idx],
        });

        const coordinates = place.results[0].geometry.location;

        const distance1 = google.maps.geometry.spherical.computeDistanceBetween(
          from,
          coordinates
        );

        return { distance: { value: distance1 } };
      });

      const d = await Promise.all(rows);

      const miles = d.map((i) =>
        Math.ceil((i.distance.value / 1000) * 0.621371)
      );

      setDistances(miles);
    } else {
      setNotFound(true);
    }
  };
  console.log({ place });
  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  return (
    <div className={styles.w}>
      <div className={styles.sidebar}>
        <AutocompleteInput
          onPlaceChanged={onPlaceChanged}
          onLoad={onLoad}
          setMyPosition={setMyPosition}
          setToDefaultPosition={setToDefaultPosition}
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
        {place !== null && (
          <PlaceDetails place={place} onClose={() => setPlace(null)} />
        )}

        <GoogleMap
          zoom={DEFAULT_ZOOM}
          options={{
            minZoom: DEFAULT_MIN_ZOOM,
            styles: locationMapStyles,
            scrollwheel: false,
            mapTypeControl: false,
          }}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          center={CENTER}
          mapContainerClassName={mapContainerClassName}
        >
          {currentLatLng && <MyPositionMarker position={currentLatLng} />}

          <ClustererView
            markers={markersLatLngs}
            locations={locations}
            selectedId={selectedId}
            zoomByPosition={zoomByPosition}
          />
        </GoogleMap>
      </div>
    </div>
  );
};

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

function AutocompleteInput({
  onLoad,
  onPlaceChanged,
  setMyPosition,
  setToDefaultPosition,
}) {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [geocoder] = useState(() => new google.maps.Geocoder());

  const onSearch = async () => {
    const res = await geocoder.geocode({ address: searchValue });
    const coordinates = res.results[0].geometry.location;

    setMyPosition({ lat: coordinates.lat(), lng: coordinates.lng() });
  };

  const onClear = () => {
    setToDefaultPosition();
    setSearchValue('');
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
        {searchValue.trim() !== '' && (
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

function ClustererView({ markers, locations, selectedId, zoomByPosition }) {
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
            selectedId={selectedId}
          />
        );
      }}
    </MarkerClusterer>
  );
}

const MarkersList = ({
  markers,
  clusterer,
  onClick,
  locations,
  selectedId,
}) => {
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

        const isPopUpActive =
          selectedId === location.id || location.id === activeId;

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

  const onLocationClick = async (location) => {
    const geocoder = new google.maps.Geocoder();

    const res = await geocoder.geocode({ address: location.address });

    // The Smart Fit Method, Chesterfield Drive, Cardiff, CA, USA
    const coordinates = res.results[0].geometry.location;

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
        {locations.map((location, idx) => (
          <LocationItem
            key={location.id}
            location={location}
            onLocationClick={onLocationClick}
            selectedId={selectedId}
            distance={distances.length > 0 && distances[idx]}
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

export default Location;
