import {useMutation, useQueryClient} from 'react-query';
import {notification} from 'antd';


export const useCreateQuery = (mutationKey, mutationFn) => {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    mutate,
  } = useMutation( mutationFn, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries(mutationKey);
      const previousCategories = queryClient.getQueryData(mutationKey);
      queryClient.setQueryData(mutationKey, [...previousCategories, newData]);

      return {data, newData};
    },
    onError: (err, data, context) => {
      notification.error({
        message: 'Ошибка создания',
        description: error?.response?.data?.message,
        placement: 'bottomRight',
      });

      queryClient.setQueryData(
          mutationKey,
          context.previousCategories,
      );
    },
    onSuccess: (data, variables, context) => {
      notification.success({
        message: `Объект успешно создан`,
        placement: 'bottomRight',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(mutationKey);
    },
  },
  );

  return {mutate};
};
