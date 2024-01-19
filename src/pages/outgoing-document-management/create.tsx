import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useUploadForm } from '@/apis/outgoingDocument';
import CreateDocumentForm from '@/components/document/outgoing/outgoing-doc-create-form';
import { DEFAULT_PAGE_WIDTH } from '@/constants';
import { UploadFile, validation } from '@/models';

const CreateOutgoingDocumentPage = ({
  handleNextStep,
  setNewDocId
}: {
  handleNextStep?: () => void;
  setNewDocId?: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  const {
    mutate: uploadForm,
    isLoading,
    isSuccess
  } = useUploadForm({
    onSuccess: () => {
      toast.success('Tạo mới văn bản đi thành công');
      handleNextStep?.();
    },
    onError: (err) => {
      if (err) {
        toast.error(err);
      } else toast.error('Tạo mới văn bản đi thất bại');
    },
    callback: (data) => {
      if (data) {
        setNewDocId?.(data.data.id);
      }
    }
  });

  const form = useForm({
    defaultValues: {
      epitomize: '',
      documentField: 1,
      documentTypeId: 1,
      status: 1,
      processDeadline: '',
      files: [] as UploadFile[]
    },
    resolver: yupResolver(validation.outgoingDocument.createSchema)
  }) as unknown as UseFormReturn<
    validation.outgoingDocument.CreateType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;

  const { getValues, reset } = form;

  const handleSubmitForm = () => {
    uploadForm(getValues());
  };

  useEffect(() => {
    reset();
  }, [isSuccess, reset]);

  return (
    <Box>
      <Box
        sx={{
          mx: 'auto',
          width: DEFAULT_PAGE_WIDTH,
          pr: 4,
          pb: 2,
          minHeight: '90vh',
          maxHeight: '90vh'
        }}
        component={Paper}
      >
        <CreateDocumentForm
          isSubmitForm={isLoading}
          handleSubmitForm={handleSubmitForm}
          form={form}
          sx={{ width: '100%' }}
        />
      </Box>
    </Box>
  );
};

export default CreateOutgoingDocumentPage;
