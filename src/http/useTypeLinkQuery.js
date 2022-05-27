import {useQuery} from 'react-query';
import {API} from './userAPI';

export const useTypeLinkQuery = () => {
  const {data} = useQuery('cityList', API('typeLink'));
  return {data};
};
