import {useMutation, useQueryClient} from 'react-query';
import {notification} from 'antd';


export const useRemoveQuery = (mutationKey, mutationFn) => {
  const queryClient = useQueryClient();

  const {
    error,
    mutate,
  } = useMutation( mutationFn, {
    onMutate: async (id) => {
      await queryClient.cancelQueries(mutationKey);
      const prevData = queryClient.getQueryData(mutationKey);
      const modifiedCategory = prevData.filter((c) => c.id !== id);

      queryClient.setQueryData(mutationKey, [...modifiedCategory]);

      return {prevData};
    },
    onError: (err, variables, context) => {
      notification.error({
        message: 'Ошибка удаления',
        description: error?.response?.data?.message,
        placement: 'bottomRight',
      });

      queryClient.setQueryData(
          mutationKey,
          context.prevData,
      );
    },
    onSuccess: (data, variables) => {
      notification.success({
        message: `Объект c id ${variables} успешно удален`,
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
