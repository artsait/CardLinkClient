import {useQuery} from 'react-query';
import {API} from './userAPI';

export const useCategoryQuery = () => {
  const {data} = useQuery('categoryList', API('category'));
  return {data};
};
