import { useMutation, useQueryClient } from '@tanstack/react-query';
import { common, department, document } from '../../models';
import { axiosInstance } from '../../utils';
import { api } from '../../constants';

export const updateDepartment = async ({
  id,
  payload
}: {
  id: number;
  payload: department.UpdatePayload;
}) => {
  const url = `/api/departments?id=${id}`;
  return await axiosInstance.put(url, payload);
};

export const useUpdateDepartment = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      id: number;
      payload: department.UpdatePayload;
    }) => {
      return updateDepartment(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.DEPARTMENT] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
