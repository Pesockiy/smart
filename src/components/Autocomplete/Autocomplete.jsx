import { useRef, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import cx from 'class-names';

import { useGeocoder } from '@/hooks';
import styles from './Autocomplete.module.sass';
import { getLatLngByPlace, isEmpty } from '@/helpers';
import CloseIcon from '@/common/CloseIcon/CloseIcon';

const GoogleAutocompleteInput = ({
  onLoad,
  onPlaceChanged,
  setMyPosition,
  setToDefaultPosition,
  setNotFound,
  calculateDistanceFrom,
  onClear,
  className = '',
}) => {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const geocode = useGeocoder();

  const onSearch = async () => {
    try {
      setIsSearching(true);

      const place = await geocode({ address: searchValue });

      await calculateDistanceFrom({ from: getLatLngByPlace(place.results[0]) });

      setNotFound(false);
      setIsSearching(false);
      setMyPosition(getLatLngByPlace(place.results[0]));
    } catch (error) {
      setNotFound(true);
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setToDefaultPosition();
    setSearchValue('');
    setNotFound(false);
    onClear();

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

  const hasCloseBtn = !isEmpty(searchValue);

  const wrapperClassName = cx(styles.autocomplete, className);

  return (
    <Autocomplete
      className={wrapperClassName}
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

        {hasCloseBtn && (
          <button className={styles.clearBtn} onClick={handleClear}>
            <CloseIcon />
          </button>
        )}

        <button
          className={styles.searchBtn}
          onClick={onSearch}
          disabled={isSearching}
        >
          Search
        </button>
      </div>
    </Autocomplete>
  );
};

export default GoogleAutocompleteInput;
