import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useUploadInternalForm } from '@/apis/internalDocument/uploadForm';
import CreateInternalDocumentForm from '@/components/document/internal/internal-doc-create-form';
import { DEFAULT_PAGE_WIDTH } from '@/constants';
import { UploadFile, validation } from '@/models';

const CreateInternalDocumentPage = ({
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
  } = useUploadInternalForm({
    onSuccess: () => {
      toast.success('Tạo văn bản nội bộ thành công');
      handleNextStep?.();
    },
    onError: (err) => {
      if (err) {
        toast.error(err);
      } else toast.error('Tạo văn bản nội bộ thất bại');
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
      internalNotation: '',
      priority: 1
    },
    resolver: yupResolver(validation.internalDocument.createSchema)
  }) as UseFormReturn<
    validation.internalDocument.CreateType,
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
        <CreateInternalDocumentForm
          isSubmitForm={isLoading}
          handleSubmitForm={handleSubmitForm}
          form={form}
          sx={{ width: '100%' }}
        />
      </Box>
    </Box>
  );
};

export default CreateInternalDocumentPage;
