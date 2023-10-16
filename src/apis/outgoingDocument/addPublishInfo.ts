import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common, outgoingDocument } from '@/models';
import { axiosInstance } from '@/utils';

export const addPublishInfo = async (
  payload: outgoingDocument.OutgoingPublishInfo
) => {
  const url = 'api/OutgoingDocument/create-publish-info';
  console.log('call', url);
  const response = await axiosInstance.post(url, payload);
  return response.data;
};

export const useAddPublishInfo = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPublishInfo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.OUTGOING_DOCUMENT] });
      onSuccess && onSuccess(data);
    },
    onError: () => {
      onError && onError();
    }
  });
};
