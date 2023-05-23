import { createCountryOption } from '@/components/CountryFlag/CountryFlag';
import { useEffect, useState } from 'react';

const useHandleCountryPhoneOptions = () => {
  const [countryList, setCountryList] = useState([]);
  const [option, setOption] = useState(null);

  useEffect(() => {
    const getCountriesInfo = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/all?fields=fifa,flags,idd,name,cca2,cca3,ccn3`
        );

        const result = await response.json();

        const option = result.find(
          (item) => item.cca2.toUpperCase() === 'US' && item.cca3.toUpperCase() === 'USA'
        );
        setOption(createCountryOption(option));
        setCountryList(result);
      } catch (error) {
        setCountryList([]);
        setOption(null);
      }
    };

    getCountriesInfo();
  }, []);

  return { countryList, option, setOption };
};

export default useHandleCountryPhoneOptions;
