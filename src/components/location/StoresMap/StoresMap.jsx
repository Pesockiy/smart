import { useRef, useState } from 'react';

import { calculateRoutesDistance, geocoder } from '@/helpers';
import { usePlaceService } from '@/hooks';
import ClustererView from '../Clusterer/ClustererView';
import LocationSlider from '../LocationSlider/LocationSlider';
import LocationsList from '../LocationsList/LocationsList';
import MapContainer from '../MapContainer/MapContainer';
import MyPositionMarker from '../MyPositionMarker/MyPositionMarker';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import PlaceNotFound from '../PlaceNotFound/PlaceNotFound';
import styles from './StoresMap.module.sass';
import AutocompleteInput from '@/components/AutoInput/AutocompleteInput';
import useGetMarkerPositionsByLocations from '@/hooks/useGetMarkerPositionsByLocations';

const DEFAULT_CENTER = { lat: 33.01982568565792, lng: -117.28095444398336 };
const isPlaceAvailable = (place) => place !== null;

const StoresMap = ({ mapContainerClassName, locations, markers }) => {
  const mapRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [notFoundValue, setNotFoundValue] = useState('');
  const [distances, setDistances] = useState([]);
  const markerPositions = useGetMarkerPositionsByLocations({ locations: markers });
  const getPlaceDetails = usePlaceService();

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

    const point = await geocoder({ address: location.address });
    const place = await getPlaceDetails({
      placeId: point.results[0].place_id,
      map: mapRef.current,
    });

    setPlace(place);
  };

  const setMyPosition = (position) => {
    zoomByPosition({ position, zoom: 10 });
    setCurrentLatLng(position);
  };

  const setToDefaultPosition = () => {
    setCurrentLatLng(null);
    mapRef.current?.panTo(DEFAULT_CENTER);
  };

  const calculateDistanceFrom = async ({ from }) => {
    const miles = await calculateRoutesDistance({
      from,
      to: markerPositions,
    });

    setDistances(miles);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <AutocompleteInput
          className={styles.autocompleteInput}
          onPlaceSelect={(point) => {
            setMyPosition(point);
            calculateDistanceFrom({ from: point });
            setNotFoundValue('');
          }}
          onClear={() => {
            setDistances([]);
            setToDefaultPosition();
            setNotFound(false);
            setNotFoundValue('');
          }}
          onError={({ value }) => {
            setNotFoundValue(value);
            setNotFound(true);
          }}
        />

        <LocationsList
          distances={distances}
          locations={locations}
          map={mapRef.current}
          onSelect={onSelect}
        />
      </div>

      <LocationSlider map={mapRef.current} locations={locations} onSelect={onSelect} />

      <div className={styles.mapContainer}>
        {notFound && <PlaceNotFound name={notFoundValue} />}

        {isPlaceAvailable(place) && <PlaceDetails place={place} onClose={() => setPlace(null)} />}

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
