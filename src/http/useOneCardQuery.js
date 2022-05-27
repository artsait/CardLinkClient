import {useQuery} from 'react-query';
import {cardOneAPI} from './userAPI';

export const useOneCardsQuery = (id) => {
  const {data} = useQuery(['card', id], () => cardOneAPI(id));
  return {data};
};
