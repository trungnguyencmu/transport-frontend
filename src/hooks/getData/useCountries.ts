import { useEffect, useState, useRef } from 'react';
import { apiService } from '@/services/apiService';

export const useCountries = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [optionCountries, setOptionsCountries] = useState<any[]>([]);
  const isFetching = useRef(false); // Prevent concurrent calls

  const fetchClients = async () => {
    // if (countries.length > 0 || isFetching.current) return; // Ensure no duplicate calls
    // isFetching.current = true; // Lock the fetch

    try {
      console.log('Fetching countries...');
      const res = await apiService.get('v1/data', {});
      console.log('Fetched countries response:', res);

      const tmpCountries = res?.data?.address_country || [];
      const tmpOptions = tmpCountries.map((country) => ({
        value: country.key,
        name: country.value,
      }));

      setOptionsCountries(tmpOptions);
      setCountries(tmpCountries);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    } finally {
      isFetching.current = false; // Unlock fetch
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return { countries, optionCountries };
};
