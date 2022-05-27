import {useQuery} from 'react-query';
import {API} from './userAPI';

export const useCityQuery = () => {
  const {data} = useQuery('cityList', API('city'));
  return {data};
};
