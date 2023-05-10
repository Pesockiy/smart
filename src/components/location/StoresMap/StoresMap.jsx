import { useRef, useState } from 'react';

import GoogleAutocompleteInput from '@/components/Autocomplete/Autocomplete';
import { getLatLngByPlace } from '@/helpers';
import {
  useCalculateRoutesDistance,
  useGeocoder,
  useGetLatLngByLocations,
  usePlaceService,
} from '@/hooks';
import ClustererView from '../Clusterer/ClustererView';
import LocationSlider from '../LocationSlider/LocationSlider';
import LocationsList from '../LocationsList/LocationsList';
import MapContainer from '../MapContainer/MapContainer';
import MyPositionMarker from '../MyPositionMarker/MyPositionMarker';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import PlaceNotFound from '../PlaceNotFound/PlaceNotFound';
import styles from './StoresMap.module.sass';

const DEFAULT_CENTER = { lat: 33.01982568565792, lng: -117.28095444398336 };
const isPlaceAvailable = (place) => place !== null;

const StoresMap = ({ mapContainerClassName, locations, markers }) => {
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
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <GoogleAutocompleteInput
          className={styles.autocomplete}
          onPlaceChanged={onPlaceChanged}
          onLoad={onLoad}
          setMyPosition={setMyPosition}
          setToDefaultPosition={setToDefaultPosition}
          setNotFound={setNotFound}
          calculateDistanceFrom={calculateDistanceFrom}
          onClear={() => setDistances([])}
        />

        <LocationsList
          distances={distances}
          locations={locations}
          map={mapRef.current}
          onSelect={onSelect}
        />
      </div>

      <LocationSlider
        map={mapRef.current}
        locations={locations}
        onSelect={onSelect}
      />

      <div className={styles.mapContainer}>
        {notFound && <PlaceNotFound name="Test" />}

        {isPlaceAvailable(place) && (
          <PlaceDetails place={place} onClose={() => setPlace(null)} />
        )}

        <MapContainer
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
        </MapContainer>
      </div>
    </div>
  );
};

export default StoresMap;
