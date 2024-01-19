import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { api } from '@/constants';
import { common, UploadFile } from '@/models';
import { CreateType } from '@/models/validation/outgoingDocument';
import { axiosInstance } from '@/utils';

type AttachmentType = {
  name: string;
  url: string;
  needSigned: boolean;
};
export interface IncomingPublishInfo {
  incomingNotation: string;
  publishDate: string;
  dueDate: string;
  priority: number;
}

type OutgoingDocumentUploadFormType = {
  processDeadline: string;
  epitomize: string;
  documentField: string;
  documentTypeId: number;
  attachments: AttachmentType[];
};

type AttachmentTypeResponse = AttachmentType & {
  id: number;
};

export type OutGoingDocumentUploadFormTypeResponse = {
  data: Omit<OutgoingDocumentUploadFormType, 'attachments'> & {
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

type UploadedFile = {
  name: string;
  url: string;
  fileGuid: string;
};
type UploadFileResponse = {
  data: UploadedFile[];
};

const convertToOutGoingDocumentUploadFormType = (
  createObj: CreateType
): OutgoingDocumentUploadFormType => {
  const outGoingDocumentUploadFormType: OutgoingDocumentUploadFormType = {
    epitomize: createObj.epitomize,
    documentField: String(createObj.documentField),
    documentTypeId: createObj.documentTypeId,
    processDeadline: createObj.processDeadline,
    attachments:
      createObj.files?.map((file) => ({
        FileGuid: file.fileGuid,
        name: file.name ?? '',
        url: file.url ?? '',
        needSigned: file.needSigned,
        size: file.fileObj?.size,
        mimeType: file.fileObj?.type
      })) ?? []
  };

  return outGoingDocumentUploadFormType;
};

export const uploadFile = async (
  payload: UploadFile[]
): Promise<UploadedFile[]> => {
  const url = 'api/upload';

  const formData = new FormData();

  for (let i = 0; i < payload.length; i++) {
    if (payload[i] && payload[i].fileObj) {
      if (payload[i].fileObj) {
        formData.append('files', payload[i].fileObj as File);
      }
    }
  }

  const result: UploadFileResponse = await axiosInstance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return result.data;
};

export const uploadForm = async (
  formData: CreateType,
  callback?: (newEntity: OutGoingDocumentUploadFormTypeResponse) => void
): Promise<OutGoingDocumentUploadFormTypeResponse> => {
  const url = 'api/OutgoingDocument';

  const { files: formFiles } = formData;

  if (!formFiles) throw new Error('File is required');

  const uploadedFile = await uploadFile(formFiles);

  for (let idx = 0; idx < uploadedFile.length; idx++) {
    formFiles[idx].setNameUrlAndGuid(
      uploadedFile[idx].name,
      uploadedFile[idx].url,
      uploadedFile[idx].fileGuid
    );
  }

  const payload = convertToOutGoingDocumentUploadFormType(formData);

  const res: OutGoingDocumentUploadFormTypeResponse = await axiosInstance.post(
    url,
    payload
  );
  callback?.(res);
  return res;
};

export const useUploadForm = ({
  onSuccess,
  onError,
  callback
}: common.useMutationParams & {
  callback?: (newEntity: OutGoingDocumentUploadFormTypeResponse) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateType) => uploadForm(payload, callback),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.DEPARTMENT] });
      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      onError?.(error?.response?.data);
    }
  });
};
