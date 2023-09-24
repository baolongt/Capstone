import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { UploadFile } from '@/models';
import { axiosInstance } from '@/utils';

type NameAndUrlFile = {
  name: string;
  url: string;
};
type UploadFileResponse = {
  data: NameAndUrlFile[];
};

export const uploadCSVUser = async (payload: UploadFile) => {
  const url = '/api/users/AddUsers';

  const formData = new FormData();
  formData.append('files', payload.fileObj as File);
  const result: UploadFileResponse = await axiosInstance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return result.data;
};

export const upLoadUser = async (file: File) => {
  console.log('file input: ', file);
  const url = '/api/users/AddUsers';
  if (!file) throw new Error('File is required');
  const upFile: UploadFile = new UploadFile({
    fileObj: file
  });
  const uploadedFile = await uploadCSVUser(upFile);
  return uploadedFile;
};

export type useAddUserParams = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useAddUser = ({ onSuccess, onError }: useAddUserParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => upLoadUser(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.USER] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
