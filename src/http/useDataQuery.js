import {useQuery} from 'react-query';

export const useCardsQuery = (key, fn) => {
  const {data} = useQuery(key, fn);
  return {data};
};
