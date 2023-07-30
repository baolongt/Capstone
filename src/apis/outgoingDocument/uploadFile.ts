import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common, UploadFile } from '@/models';
import { axiosInstance } from '@/utils';

type NameAndUrlFile = {
  name: string;
  url: string;
};
type UploadFileResponse = {
  data: NameAndUrlFile[];
};

export const uploadFile = async (
  payload: UploadFile[]
): Promise<NameAndUrlFile[]> => {
  const url = 'api/upload';

  const formData = new FormData();

  for (let i = 0; i < payload.length; i++) {
    if (payload[i] && payload[i].fileObj) {
      formData.append('files', payload[i]?.fileObj);
    }
  }

  const result: UploadFileResponse = await axiosInstance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return result.data;
};

export const useUploadFile = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UploadFile[]) => uploadFile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.OUTGOING_DOCUMENT] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
