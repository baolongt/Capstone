import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

type addEmailTemplateType = {
  id: number;
  emailTemplate: string;
  emailSubject: string;
};

const addEmailTemplate = async ({
  id,
  emailTemplate,
  emailSubject
}: addEmailTemplateType) => {
  const url = `api/OutgoingDocument/${id}/email`;
  const response = await axiosInstance.put(url, {
    emailTemplate,
    emailSubject
  });

  return response;
};

export const useAddEmailTemplate = ({
  onSuccess,
  onError,
  id
}: common.useMutationParams & {
  id: number;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addEmailTemplate,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.OUTGOING_DOCUMENT, id] });
      onSuccess && onSuccess(data);
    },
    onError: () => {
      onError && onError();
    }
  });
};
