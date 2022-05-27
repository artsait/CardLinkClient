import {useQuery} from 'react-query';
import {API} from './userAPI';

export const useCardsQuery = () => {
  const {data} = useQuery('cardList', API('card'));
  return {data};
};
