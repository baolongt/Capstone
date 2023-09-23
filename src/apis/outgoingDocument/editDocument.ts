import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DragAndDropBoxValueType } from '@/components/common/form-control/drag-and-drop-box';
import { api } from '@/constants';
import { Attachment, common, UploadFile } from '@/models';
import { EditType } from '@/models/validation/outgoingDocument';
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

  const uploadedFilesToAttchment = uploadedFiles.map((file, index) => {
    return new Attachment({
      name: file.name,
      url: file.url,
      needSigned: needUploadFile[index].needSigned,
      size: String(needUploadFile[index].fileObj?.size || ''),
      mimeType: needUploadFile[index].fileObj?.type || ''
    });
  });

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
    note
  } = editObj;
  const data = {
    epitomize,
    documentField: documentField.toString(),
    documentTypeId,
    note,
    attachments: await convertToEditAttachmentPayload(files),
    processDeadline
  };
  const response = await axiosInstance.put(`api/OutgoingDocument/${id}`, data);
  return response.data;
};

export const useEditDocument = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, editObj }: { id: string; editObj: EditType }) =>
      editDocument(id, editObj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.OUTGOING_DOCUMENT] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
