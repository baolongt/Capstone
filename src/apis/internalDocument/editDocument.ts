import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DragAndDropBoxValueType } from '@/components/common/form-control/drag-and-drop-box';
import { api } from '@/constants';
import { Attachment, common, UploadFile } from '@/models';
import { EditType } from '@/models/validation/internalDocument';
import { axiosInstance } from '@/utils';

import { uploadFile } from './uploadForm';

const convertToEditAttachmentPayload = async (
  objects: DragAndDropBoxValueType[]
): Promise<Attachment[]> => {
  // upload all files
  const needUploadFile = <UploadFile[]>(
    objects.filter((file) => file instanceof UploadFile)
  );
  const uploadedAttachment = <Attachment[]>(
    objects.filter((file) => file instanceof Attachment)
  );

  const uploadedFiles = await uploadFile(needUploadFile as UploadFile[]);
  console.log('uploadedFiles', uploadedFiles);

  const uploadedFilesToAttchment = uploadedFiles.map((file, index) => {
    console.log('debug', file);
    return new Attachment({
      name: file.name,
      url: file.url,
      needSigned: needUploadFile[index].needSigned,
      size: String(needUploadFile[index].fileObj?.size || ''),
      mimeType: needUploadFile[index].fileObj?.type || '',
      fileGuid: file.fileGuid as string
    });
  });

  console.log('uploadedFilesToAttchment', uploadedFilesToAttchment);

  return [...uploadedAttachment, ...uploadedFilesToAttchment];
};

export const editDocument = async (
  id: string,
  editObj: EditType
): Promise<void> => {
  const {
    epitomize,
    documentField,
    documentTypeId,
    files,
    processDeadline,
    documentNotation
  } = editObj;
  const data = {
    epitomize,
    documentField: documentField.toString(),
    documentTypeId,
    attachments: (await convertToEditAttachmentPayload(files)).map((f) => {
      return { ...f, FileGuid: f.fileGuid };
    }),
    processDeadline,
    internalNotation: documentNotation
  };
  const response = await axiosInstance.put(`api/InternalDocument/${id}`, data);
  return response.data;
};

export const useEditInternalDocument = ({
  onSuccess,
  onError,
  id
}: common.useMutationParams & { id: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, editObj }: { id: string; editObj: EditType }) =>
      editDocument(id, editObj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.INTERNAL_DOCUMENT, id] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
