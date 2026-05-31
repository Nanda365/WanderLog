import axios from 'axios';
import { COUNTRIES_API_URL } from '../utils/constants';

const countryApi = axios.create({
  baseURL: COUNTRIES_API_URL,
});

export const fetchAllCountries = async () => {
  const response = await countryApi.get('/all?fields=name,flags,population,region,capital,cca3,languages,currencies,area,borders');
  return response.data;
};

export const fetchCountryByCode = async (code) => {
  const response = await countryApi.get(`/alpha/${code}`);
  return response.data[0];
};
