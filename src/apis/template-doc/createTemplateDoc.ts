import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common, UploadFile } from '@/models';
import { axiosInstance } from '@/utils';

import { uploadFile } from '../outgoingDocument';

type CreateType = {
  name: string;
  file: UploadFile | undefined;
  description: string;
};

export const createTemplateDoc = async (createObj: CreateType) => {
  if (!createObj.file) throw new Error('File is required');

  const fileUploaded = await uploadFile(createObj.file ? [createObj.file] : []);

  const url = '/api/Template';

  return await axiosInstance.post(url, {
    name: createObj.name,
    description: createObj.description,
    url: fileUploaded[0].url
  });
};

export const useCreateTempalteDoc = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateType) => {
      return createTemplateDoc(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.TEMPLATE] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
