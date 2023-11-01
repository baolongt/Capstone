import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useUploadInternalForm } from '@/apis/internalDocument/uploadForm';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import CreateInternalDocumentForm from '@/components/document/internal/internal-doc-create-form';
import { DEFAULT_PAGE_WIDTH } from '@/constants';
import { UploadFile, validation } from '@/models';

const CreateInternalDocumentPage: React.FC = () => {
  const {
    mutate: uploadForm,
    isLoading,
    isSuccess
  } = useUploadInternalForm({
    onSuccess: () => {
      toast.success('Tạo văn bản nội bộ thành công');
    },
    onError: () => {
      toast.error('Tạo văn bản nội bộ thất bại');
    }
  });

  const form = useForm({
    defaultValues: {
      epitomize: '',
      documentField: 1,
      documentTypeId: 1,
      processDeadline: '',
      note: '',
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
    console.log('submit');
    uploadForm(getValues());
  };

  useEffect(() => {
    reset();
  }, [isSuccess, reset]);

  return (
    <Box>
      <PageHeader>
        <Box>
          <PageTitle label="thêm văn bản nội bộ" />
        </Box>
      </PageHeader>
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
