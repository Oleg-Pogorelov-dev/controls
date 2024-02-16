import { FC, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { autocompleteState } from '../../store/autocomplete';
import { getCountryByName } from '../../api/apiService';
import { useDebounceAutocomplete } from './hook';

import styles from './style.module.css';

const AutocompleteControl: FC = observer(() => {
  const [isChoosenCountry, setIsChoosenCountry] = useState<boolean>(false);

  const {
    textValue,
    countries,
    maxValue,
    isOpenMaxValue,
    setMaxValue,
    setIsOpenMaxValue,
    setTextValue,
    setCountries,
  } = autocompleteState;

  useDebounceAutocomplete(
    textValue,
    isChoosenCountry,
    1000,
    setCountries,
    getCountryByName
  );

  const chooseCountry = (name: string) => {
    setTextValue(name);
    setCountries([]);
    setIsChoosenCountry(true);
  };

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
    setIsChoosenCountry(false);
  };

  const chooseMaxValue = (item: number) => {
    setMaxValue(item);
    setIsOpenMaxValue(false);
  };

  const memoCountry = useMemo(() => {
    return countries.slice(0, maxValue);
  }, [countries, maxValue]);

  return (
    <div className={styles.autocomplete_control}>
      <div className={styles.autocomplete_input_wrapper}>
        <input
          className={styles.input_autocomplete_control}
          onChange={changeText}
          value={textValue}
        />
        <div className={styles.max_value_wrapper}>
          <div
            onClick={() => setIsOpenMaxValue(!isOpenMaxValue)}
            className={styles.max_value}
          >
            {maxValue}
          </div>
          {isOpenMaxValue && (
            <ul className={styles.max_values_dropdown}>
              {[3, 10].map((item) => (
                <li
                  key={item}
                  onClick={() => chooseMaxValue(item)}
                  className={styles.max_value_item}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={styles.dropdowns}>
        <ul className={styles.autocomplete_dropdown}>
          {memoCountry.map((country) => (
            <li
              onClick={() => chooseCountry(country.fullName)}
              key={country.name}
              className={styles.country_item}
            >
              <span>
                {country.name} {country.fullName}
              </span>
              <img className={styles.flag} src={country.flag} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default AutocompleteControl;
