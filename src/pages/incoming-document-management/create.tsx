import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useUploadIncomingForm } from '@/apis/incomingDocument/uploadForm';
import CreateInComingDocumentForm from '@/components/document/incoming/incoming-doc-create-form';
import { DEFAULT_PAGE_WIDTH } from '@/constants';
import { UploadFile, validation } from '@/models';

const CreateIncomingDocumentPage = ({
  setNewDocId,
  handleNextStep
}: {
  setNewDocId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleNextStep?: () => void;
}) => {
  const {
    mutate: uploadForm,
    isLoading,
    isSuccess
  } = useUploadIncomingForm({
    onSuccess: () => {
      toast.success('Tạo mới văn bản đến thành công');
      handleNextStep?.();
    },
    onError: () => {
      toast.error('Tạo mới văn bản đến thất bại');
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
      processDeadline: '',
      files: [] as UploadFile[],
      incomingNotation: '',
      priority: 1
    },
    resolver: yupResolver(validation.incomingDocument.createSchema)
  }) as UseFormReturn<
    validation.incomingDocument.CreateType,
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
        sx={{ mx: 'auto', width: DEFAULT_PAGE_WIDTH, pr: 4, pb: 2 }}
        component={Paper}
      >
        <CreateInComingDocumentForm
          isSubmitForm={isLoading}
          handleSubmitForm={handleSubmitForm}
          form={form}
          sx={{ width: '100%' }}
        />
      </Box>
    </Box>
  );
};

export default CreateIncomingDocumentPage;
