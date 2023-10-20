import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { api, TIMEZONE } from '@/constants';
import { common, UploadFile } from '@/models';
import { IncomingPublishInfo } from '@/models/incomingDocument';
import { CreateType } from '@/models/validation/incomingDocument';
import { axiosInstance } from '@/utils';

type AttachmentType = {
  name: string;
  url: string;
  needSigned: boolean;
};

type IncomingDocumentUploadFormType = {
  epitomize: string;
  documentField: string;
  documentTypeId: number;
  isRepliedDocument: boolean;
  note: string;
  processDeadline: string;
  attachments: AttachmentType[];
  incomingPublishInfo: IncomingPublishInfo;
};

type AttachmentTypeResponse = AttachmentType & {
  id: number;
};

type IncomingDocumentUploadFormTypeResponse = {
  data: Omit<IncomingDocumentUploadFormType, 'attachments'> & {
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

const convertToIncomingDocumentUploadFormType = (
  createObj: CreateType
): IncomingDocumentUploadFormType => {
  const inComingDocumentUploadFormType: IncomingDocumentUploadFormType = {
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
    incomingPublishInfo: {
      incomingNotation: createObj.incomingNotation,
      publishDate: dayjs.tz(new Date(), TIMEZONE).format(),
      dueDate: createObj.processDeadline,
      priority: createObj.priority
    }
  };

  return inComingDocumentUploadFormType;
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
): Promise<IncomingDocumentUploadFormTypeResponse> => {
  const url = 'api/IncomingDocument';

  const { files: formFiles } = formData;

  if (!formFiles) throw new Error('File is required');

  const uploadedFile = await uploadFile(formFiles);

  for (let idx = 0; idx < uploadedFile.length; idx++) {
    formFiles[idx].setNameAndUrl(uploadedFile[idx].name, uploadedFile[idx].url);
  }

  const payload = convertToIncomingDocumentUploadFormType(formData);

  return await axiosInstance.post(url, payload);
};

export const useUploadIncomingForm = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateType) => uploadForm(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.INCOMING_DOCUMENT] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
