import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { CreateType } from '@/types/validation/outgoingDocument';
import { axiosInstance } from '@/utils';

type AttachmentType = {
  name: string;
  url: string;
  needSigned: boolean;
};

type OutGoingDocumentUploadFormType = {
  epitomize: string;
  documentField: string;
  documentTypeId: number;
  isRepliedDocument: boolean;
  note: string;
  attachments: AttachmentType[];
};

type AttachmentTypeResponse = AttachmentType & {
  id: number;
};

type OutGoingDocumentUploadFormTypeResponse = {
  data: Omit<OutGoingDocumentUploadFormType, 'attachments'> & {
    id: number;
    createdBy: number | null;
    createdDate: string;
    createdById: number;
    updatedDate: string;
    updatedBy: number;
    isDeleted: boolean;
  };
  attachments: AttachmentTypeResponse[];
};

const convertToOutGoingDocumentUploadFormType = (
  createObj: CreateType
): OutGoingDocumentUploadFormType => {
  const outGoingDocumentUploadFormType: OutGoingDocumentUploadFormType = {
    epitomize: createObj.epitomize,
    documentField: String(createObj.documentField),
    documentTypeId: createObj.documentTypeId,
    isRepliedDocument: createObj.isRepliedDocument ?? false,
    note: createObj.note,
    attachments:
      createObj.files?.map((file) => ({
        name: file.name ?? '',
        url: file.url ?? '',
        needSigned: file.needSigned
      })) ?? []
  };

  return outGoingDocumentUploadFormType;
};

export const uploadForm = async (
  formData: CreateType
): Promise<OutGoingDocumentUploadFormTypeResponse> => {
  const url = 'api/OutgoingDocument';

  const payload = convertToOutGoingDocumentUploadFormType(formData);
  console.log(payload);

  return await axiosInstance.post(url, payload);
};

export const useUploadForm = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateType) => uploadForm(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.DEPARTMENT] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
