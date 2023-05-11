import { useState } from 'react';
import cx from 'class-names';
import Highlighter from 'react-highlight-words';

import styles from './AutocompleteInput.module.sass';
import CloseIcon from '@/common/CloseIcon/CloseIcon';
import {
  geocoder,
  getLatLngByPlace,
  getPlacePredictions,
  isEmpty,
} from '@/helpers';

const AutocompleteInput = ({
  className = '',
  onPlaceSelect = () => {},
  onClear = () => {},
  onError = () => {},
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const handleChange = async (evt) => {
    setIsActive(true);
    setValue(evt.target.value);

    if (!isEmpty(evt.target.value)) {
      const predictions = await getPlacePredictions(evt.target.value);

      setSuggestions(predictions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = async (address) => {
    const point = await geocoder({ address });
    const coordinates = getLatLngByPlace(point.results[0]);

    onPlaceSelect(coordinates);
    setValue(address);
    setSuggestions([]);
  };

  const handleClear = () => {
    setSuggestions([]);
    setValue('');
    onClear();
  };

  const handleSearch = async () => {
    try {
      setIsSearching(true);

      const point = await geocoder({ address: value });

      const coordinates = getLatLngByPlace(point.results[0]);

      onPlaceSelect(coordinates);
      setIsSearching(false);
    } catch (error) {
      setIsSearching(false);
      onError({ error, value });
    }
  };

  const isSuggestionsActive = suggestions.length > 0 && isActive;

  const inputClasses = cx(styles.autocompleteInput, {
    [styles.activeInput]: !isEmpty(value),
  });

  const containerClasses = cx(styles.autocomplete, {
    [className]: !!className,
  });

  return (
    <div className={containerClasses}>
      <div className={styles.inputWrapper}>
        <input
          className={inputClasses}
          type="text"
          value={value}
          placeholder="Search your location"
          onChange={handleChange}
          onFocus={() => setIsActive(true)}
        />
        {!isEmpty(value) && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
          >
            <CloseIcon />
          </button>
        )}
        <button
          type="button"
          className={styles.searchBtn}
          disabled={isEmpty(value) || isSearching}
          onClick={handleSearch}
        >
          search
        </button>
      </div>

      {isSuggestionsActive && (
        <ul className={styles.suggestionList}>
          {suggestions.map((suggestion) => {
            return (
              <li
                key={suggestion.place_id}
                onClick={() => handleSelect(suggestion.description)}
              >
                <Highlighter
                  highlightClassName={styles.highlight}
                  searchWords={[value]}
                  autoEscape={true}
                  textToHighlight={suggestion.description}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
