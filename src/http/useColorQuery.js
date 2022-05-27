import {useQuery} from 'react-query';
import {API} from './userAPI';

export const useColorQuery = () => {
  const {data} = useQuery('colorList', API('color'));
  return {data};
};
