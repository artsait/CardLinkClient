import {useQuery} from 'react-query';
import {getLinkByCardIdAPI} from './userAPI';

export const useLinkByCardIdQuery = (cardId) => {
  const {data} = useQuery(['link', cardId], () => getLinkByCardIdAPI(cardId));
  return {data};
};
