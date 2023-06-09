import { useRef, useState } from 'react';

import { calculateRoutesDistance, geocoder, getPlaceDetails } from '@/helpers';
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

const StoresMap = ({ mapContainerClassName, locations, isLoaded }) => {
  const [locationsWithDistances, setLocationsWithDistances] = useState(
    locations.map((item) => ({ ...item, distance: null, position: null }))
  );
  const mapRef = useRef(null);
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [notFoundValue, setNotFoundValue] = useState('');
  const markerPositions = useGetMarkerPositionsByLocations({ locations, isLoaded });
  const [currentLatLng, setCurrentLatLng] = useState(null);
  const [place, setPlace] = useState(null);

  const moveToPosition = ({ position = DEFAULT_CENTER, zoom = 13, panBy = { x: 0, y: 0 } }) => {
    mapRef.current?.panTo(position);
    mapRef.current?.setZoom(zoom);
    mapRef.current?.panBy(panBy.x, panBy.y);
  };

  const onSelect = async (id) => {
    try {
      setPlace(null);

      const location = locations.find((l) => l.id === id);
      const point = await geocoder({ address: location.address });
      const place = await getPlaceDetails({
        placeId: point.results[0].place_id,
        map: mapRef.current,
      });

      setPlace(place);
    } catch (error) {
      setPlace(null);
    }
  };

  const setMyPosition = (position) => {
    moveToPosition({ position, zoom: 10, panBy: { x: 0, y: 150 } });
    setCurrentLatLng(position);
  };

  const setToDefaultPosition = () => {
    setCurrentLatLng(null);
    mapRef.current?.panTo(DEFAULT_CENTER);
  };

  const clearDistances = () => {
    setLocationsWithDistances((prev) => prev.map((item) => ({ ...item, distance: null })));
  };

  const calculateDistanceFrom = async ({ from }) => {
    try {
      const miles = await calculateRoutesDistance({
        from,
        to: markerPositions,
      });

      setLocationsWithDistances((prev) =>
        prev.map((item, idx) => ({ ...item, distance: miles[idx] }))
      );
    } catch (error) {
      clearDistances();
    }
  };

  const locationItems = locationsWithDistances.map((location, idx) => ({
    ...location,
    position: markerPositions[idx],
  }));

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
            setToDefaultPosition();
            setNotFound(false);
            setNotFoundValue('');
            clearDistances();
          }}
          onError={({ value }) => {
            setNotFoundValue(value);
            setNotFound(true);
          }}
        />

        <LocationsList
          locations={locationItems}
          onSelect={onSelect}
          setActiveMarkerId={setActiveMarkerId}
          moveToPosition={moveToPosition}
        />
      </div>

      <LocationSlider
        map={mapRef.current}
        locations={locationItems}
        onSelect={onSelect}
        setActiveMarkerId={setActiveMarkerId}
        moveToPosition={moveToPosition}
      />

      <div className={styles.mapContainer}>
        {notFound && <PlaceNotFound name={notFoundValue} />}

        {isPlaceAvailable(place) && <PlaceDetails place={place} onClose={() => setPlace(null)} />}

        {isLoaded && (
          <MapContainer
            onLoad={(map) => (mapRef.current = map)}
            center={DEFAULT_CENTER}
            mapContainerClassName={mapContainerClassName}
          >
            <>
              {currentLatLng && <MyPositionMarker position={currentLatLng} />}

              <ClustererView
                markersLatLng={markerPositions}
                locations={locationsWithDistances}
                activeMarkerId={activeMarkerId}
                moveToPosition={moveToPosition}
              />
            </>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default StoresMap;
