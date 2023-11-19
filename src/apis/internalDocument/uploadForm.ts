import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { api, TIMEZONE } from '@/constants';
import { common, UploadFile } from '@/models';
import { InternalPublishInfo } from '@/models/internalDocument';
import { CreateType } from '@/models/validation/internalDocument';
import { axiosInstance } from '@/utils';

type AttachmentType = {
  name: string;
  url: string;
  needSigned: boolean;
};

type InternalDocumentUploadFormType = {
  epitomize: string;
  documentField: string;
  documentTypeId: number;
  isRepliedDocument: boolean;
  note: string;
  processDeadline: string;
  attachments: AttachmentType[];
  internalPublishInfo: InternalPublishInfo;
};

type AttachmentTypeResponse = AttachmentType & {
  id: number;
};

type InternalDocumentUploadFormTypeResponse = {
  data: Omit<InternalDocumentUploadFormType, 'attachments'> & {
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

type NameAndUrlFile = {
  name: string;
  url: string;
};
type UploadFileResponse = {
  data: NameAndUrlFile[];
};

const convertToInternalDocumentUploadFormType = (
  createObj: CreateType
): InternalDocumentUploadFormType => {
  const internalDocumentUploadFormType: InternalDocumentUploadFormType = {
    epitomize: createObj.epitomize,
    documentField: String(createObj.documentField),
    documentTypeId: createObj.documentTypeId,
    note: createObj.note,
    isRepliedDocument: false,
    processDeadline: createObj.processDeadline,
    attachments:
      createObj.files?.map((file) => ({
        name: file.name ?? '',
        url: file.url ?? '',
        needSigned: file.needSigned,
        size: file.fileObj?.size,
        mimeType: file.fileObj?.type
      })) ?? [],
    internalPublishInfo: {
      internalNotation: createObj.internalNotation,
      publishDate: dayjs.utc(new Date()).tz(TIMEZONE).format(),
      dueDate: createObj.processDeadline,
      priority: createObj.priority
    }
  };

  return internalDocumentUploadFormType;
};

export const uploadFile = async (
  payload: UploadFile[]
): Promise<NameAndUrlFile[]> => {
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
  formData: CreateType
): Promise<InternalDocumentUploadFormTypeResponse> => {
  const url = 'api/InternalDocument';

  const { files: formFiles } = formData;

  if (!formFiles) throw new Error('File is required');

  const uploadedFile = await uploadFile(formFiles);

  for (let idx = 0; idx < uploadedFile.length; idx++) {
    formFiles[idx].setNameAndUrl(uploadedFile[idx].name, uploadedFile[idx].url);
  }

  const payload = convertToInternalDocumentUploadFormType(formData);

  return await axiosInstance.post(url, payload);
};

export const useUploadInternalForm = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateType) => uploadForm(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.INTERNAL_DOCUMENT] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
