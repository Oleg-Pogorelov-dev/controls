import { useEffect, useState } from 'react';
import { CountryInfo } from '../../api/apiService';

export const useDebounceAutocomplete = (
  textValue: string,
  isChoosenCountry: boolean,
  delay: number,
  setCountries: (countries: CountryInfo[]) => void,
  getCountryByName: (countryName: string) => Promise<CountryInfo[]>
) => {
  const [timeId, setTimeId] = useState<
    NodeJS.Timeout | undefined | string | number
  >(undefined);

  useEffect(() => {
    clearTimeout(timeId);
    if (textValue && !isChoosenCountry) {
      setTimeId(
        setTimeout(() => {
          getCountryByName(textValue).then((a) => setCountries(a));
        }, delay)
      );
    } else {
      setCountries([]);
    }
  }, [textValue]);
};
