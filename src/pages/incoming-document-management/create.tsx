import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Link, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useUploadIncomingForm } from '@/apis/incomingDocument/uploadForm';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import CreateInComingDocumentForm from '@/components/document/incoming/incoming-doc-create-form';
import { DEFAULT_PAGE_WIDTH } from '@/constants';
import { UploadFile, validation } from '@/models';

const CreateIncomingDocumentPage: React.FC = () => {
  const {
    mutate: uploadForm,
    isLoading,
    isSuccess
  } = useUploadIncomingForm({
    onSuccess: () => {
      toast.success('Tạo mới văn bản đến thành công');
    },
    onError: () => {
      toast.error('Tạo mới văn bản đến thất bại');
    }
  });

  const form = useForm({
    defaultValues: {
      epitomize: '',
      documentField: 1,
      documentTypeId: 1,
      // status: 1,
      note: '',
      processDeadline: '',
      files: [] as UploadFile[]
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
      <PageHeader>
        <Box>
          <PageTitle label="thêm văn bản đến" />
          <Link href="#">
            <RouterLink to="/template">Mẫu văn bản</RouterLink>
          </Link>
        </Box>
      </PageHeader>
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
